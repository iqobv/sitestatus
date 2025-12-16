import { HttpService } from '@nestjs/axios';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { SiteStatus } from 'generated/prisma/enums';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { MonitorService } from '../monitor/monitor.service';
import { PingResultService } from '../ping-result/ping-result.service';
import { CHECK_SITE_JOB, MONITORING_QUEUE } from './constants';
import { MonitorJobData, PingResultData } from './interfaces';

@Injectable()
@Processor(MONITORING_QUEUE)
export class MonitoringProcessor extends WorkerHost {
	private readonly logger = new Logger(MonitoringProcessor.name);

	constructor(
		private readonly httpService: HttpService,
		private readonly prismaService: PrismaService,
		private readonly pingResultService: PingResultService,
		private readonly monitorService: MonitorService,
	) {
		super();
	}

	async process(job: Job<MonitorJobData>) {
		if (job.name === CHECK_SITE_JOB) {
			await this.handleCheckSite(job);
		} else {
			this.logger.warn(`[Worker] Unknown job name: ${job.name}`);
		}
	}

	async handleCheckSite(job: Job<MonitorJobData>) {
		const { monitorId, url } = job.data;

		const monitor = await this.prismaService.monitor.findUnique({
			where: { id: monitorId },
		});

		if (!monitor || !monitor.userId) return;

		const result = await this.performCheck(url);

		await this.pingResultService.create({
			monitorId,
			status: result.status,
			statusCode: result.statusCode ?? null,
			responseTimeMs: result.responseTimeMs ?? null,
			errorMessage: result.error ?? null,
		});

		const nextCheck = new Date(
			Date.now() + monitor.checkIntervalSeconds * 1000,
		);

		await this.monitorService.update(monitorId, monitor.userId, {
			lastStatus: result.status,
			lastCheckedAt: new Date(),
			nextCheckAt: nextCheck,
		});
	}

	private async performCheck(url: string): Promise<PingResultData> {
		const startTime = Date.now();
		try {
			const response = await firstValueFrom(
				this.httpService.get(url, {
					validateStatus: (status) => status >= 200 && status < 600,
				}),
			);

			const responseTimeMs = Date.now() - startTime;

			if (response.status >= 200 && response.status < 400) {
				return {
					status: SiteStatus.UP,
					statusCode: response.status,
					responseTimeMs,
				};
			}

			return {
				status: SiteStatus.DOWN,
				statusCode: response.status,
				responseTimeMs,
			};
		} catch (err: unknown) {
			const responseTimeMs = Date.now() - startTime;

			let errorMessage = 'Unknown error';
			if (typeof err === 'object' && err !== null) {
				const e = err as { code?: unknown; message?: unknown };
				if (typeof e.code === 'string' && e.code) {
					errorMessage = e.code;
				} else if (typeof e.message === 'string') {
					errorMessage = e.message;
				}
			} else if (typeof err === 'string') {
				errorMessage = err;
			}

			return {
				status: SiteStatus.DOWN,
				statusCode: null,
				responseTimeMs,
				error: errorMessage,
			};
		}
	}
}
