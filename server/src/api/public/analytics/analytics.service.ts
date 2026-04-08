import { Injectable } from '@nestjs/common';
import { StatPeriod } from 'generated/prisma/enums';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAnalyticsByMonitorId(monitorId: string, daysRange: number) {
		const now = new Date();
		const startDate = new Date(now);
		startDate.setUTCDate(startDate.getUTCDate() - daysRange);

		if (daysRange <= 1) {
			const rawLogs = await this.prismaService.monitorLog.findMany({
				where: { monitorId, createdAt: { gte: startDate } },
				select: {
					status: true,
					responseTimeMs: true,
					errorMessage: true,
					createdAt: true,
					regionId: true,
				},
			});

			return {
				period: 'RAW',
				data: rawLogs,
			};
		}

		const periodToFetch = daysRange <= 7 ? StatPeriod.HOURLY : StatPeriod.DAILY;

		const aggregatedStats = await this.prismaService.monitorStats.findMany({
			where: {
				monitorId,
				period: periodToFetch,
				timestamp: { gte: startDate },
			},
			orderBy: { timestamp: 'asc' },
			select: {
				uptimePercent: true,
				avgResponseMs: true,
				timestamp: true,
				regionId: true,
				status: true,
			},
		});

		return {
			period: periodToFetch,
			data: aggregatedStats,
		};
	}
}
