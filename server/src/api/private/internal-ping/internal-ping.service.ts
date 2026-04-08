import { Injectable } from '@nestjs/common';
import { SiteStatus } from 'generated/prisma/enums';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { AdminRegionService } from '../admin-region/admin-region.service';
import { PingResultDto } from './dto';
import { MonitorTask } from './interface';

@Injectable()
export class InternalPingService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly regionService: AdminRegionService,
	) {}

	async getTasks(regionKey: string): Promise<MonitorTask[]> {
		const region = await this.regionService.getRegionByKey(regionKey);

		const monitors = await this.prismaService.monitor.findMany({
			where: {
				isActive: true,
				regionConfigs: {
					some: { regionId: region.id, nextCheckAt: { lte: new Date() } },
				},
			},
		});

		return monitors.map((task) => ({
			id: task.id,
			url: task.url,
		}));
	}

	async saveResults(results: PingResultDto[], regionKey: string) {
		if (results.length === 0) return;

		const region = await this.regionService.getRegionByKey(regionKey);

		await this.prismaService.$transaction(async (tx) => {
			await tx.monitorLog.createMany({
				data: results.map((r) => ({
					monitorId: r.monitorId,
					regionId: region.id,
					status: r.status,
					statusCode: r.statusCode,
					responseTimeMs: r.responseTimeMs,
					errorMessage: r.errorMessage,
				})),
				skipDuplicates: true,
			});

			for (const result of results) {
				const monitor = await tx.monitor.findUnique({
					where: { id: result.monitorId },
					select: { id: true, checkIntervalSeconds: true },
				});

				if (!monitor) continue;

				const { checkIntervalSeconds } = monitor;

				const nextInterval =
					result.status === SiteStatus.DOWN ||
					result.status === SiteStatus.UNKNOWN
						? Math.min(60, checkIntervalSeconds)
						: checkIntervalSeconds;

				const nextCheckAt = new Date();
				nextCheckAt.setSeconds(nextCheckAt.getSeconds() + nextInterval);

				const monitorRangeData = {
					lastStatus: result.status,
					lastCheckedAt: new Date(),
					nextCheckAt,
				};

				await tx.monitorRegion.upsert({
					where: {
						monitorId_regionId: { monitorId: monitor.id, regionId: region.id },
					},
					create: {
						monitorId: monitor.id,
						regionId: region.id,
						isActive: true,
						...monitorRangeData,
					},
					update: monitorRangeData,
				});

				await tx.monitor.update({
					where: { id: monitor.id },
					data: { lastStatus: result.status, lastCheckedAt: new Date() },
				});
			}
		});
	}
}
