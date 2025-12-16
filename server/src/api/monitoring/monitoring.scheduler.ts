import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bullmq';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CHECK_SITE_JOB, MONITORING_QUEUE } from './constants';

@Injectable()
export class MonitoringScheduler {
	private readonly logger = new Logger(MonitoringScheduler.name);

	constructor(
		@InjectQueue(MONITORING_QUEUE) private readonly monitoringQueue: Queue,
		private readonly prismaService: PrismaService,
	) {}

	@Cron(CronExpression.EVERY_MINUTE)
	async addChecksToQueue() {
		this.logger.log('Adding checks to monitoring queue');

		const bufferTime = new Date(Date.now() + 5000);

		const monitorsToCheck = await this.prismaService.monitor.findMany({
			where: {
				isActive: true,
				nextCheckAt: { lte: bufferTime },
			},
		});

		if (monitorsToCheck.length === 0) {
			this.logger.log('No monitors to check this minute.');
			return;
		}

		this.logger.log(`Found ${monitorsToCheck.length} monitors to check.`);

		const jobIds = monitorsToCheck.map((monitor) => monitor.id);
		await this.prismaService.monitor.updateMany({
			where: { id: { in: jobIds } },
			data: { nextCheckAt: new Date(Date.now() + 60 * 10 * 1000) },
		});

		for (const monitor of monitorsToCheck) {
			await this.monitoringQueue.add(
				CHECK_SITE_JOB,
				{
					monitorId: monitor.id,
					url: monitor.url,
				},
				{
					removeOnComplete: 1000,
					removeOnFail: 5000,
				},
			);
		}

		this.logger.log(`Added ${monitorsToCheck.length} jobs to the queue.`);
	}
}
