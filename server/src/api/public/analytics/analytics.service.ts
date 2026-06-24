import { StatPeriod } from '@generated/turso/enums';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import { CalculateLogs } from '@libs/types/calculate-logs.types';
import { calculateErrorRate } from '@libs/utils/calculates/calculate-error-rate.util';
import { calculateP95 } from '@libs/utils/calculates/calculate-p95.util';
import { calculateResponseTime } from '@libs/utils/calculates/calculate-response-time.util';
import { calculateUptime } from '@libs/utils/calculates/calculate-uptime.util';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';
import { AnalyticsStatisticsDto } from './dto/analytics-statistics.dto';
import { AnalyticsDto } from './dto/analytics.dto';

@Injectable()
export class AnalyticsService {
	constructor(
		private readonly prismaService: PgPrismaService,
		private readonly tursoPrismaService: TursoPrismaService,
	) {}

	public async getAnalyticsByMonitorId(
		userId: string,
		monitorId: string,
		query: AnalyticsQueryDto,
	): Promise<AnalyticsDto> {
		const { daysRange = 1, region = 'global' } = query;

		const monitor = await this.prismaService.monitor.findFirst({
			where: { id: monitorId, userId },
			select: { id: true },
		});

		if (!monitor) throw new NotFoundException(ERROR_MESSAGES.MONITOR.NOT_FOUND);

		const now = new Date();
		const startDate = new Date(now);
		startDate.setUTCDate(startDate.getUTCDate() - daysRange);

		let regionId: string | undefined;

		if (region !== 'global') {
			const foundRegion = await this.prismaService.region.findUnique({
				where: { key: region.toLowerCase() },
			});

			if (!foundRegion)
				throw new NotFoundException(ERROR_MESSAGES.REGION.NOT_FOUND);

			regionId = foundRegion.id;
		}

		const incidents = await this.tursoPrismaService.monitorIncident.findMany({
			where: { monitorId, regionId },
			orderBy: { createdAt: 'desc' },
		});

		if (daysRange <= 1) {
			const rawLogs = await this.tursoPrismaService.monitorLog.findMany({
				where: { monitorId, createdAt: { gte: startDate }, regionId },
				select: {
					status: true,
					responseTimeMs: true,
					errorMessage: true,
					createdAt: true,
					regionId: true,
				},
			});

			const statistics = this.calculateStatistics(rawLogs);

			return {
				period: 'RAW',
				statistics,
				incidents,
				data: rawLogs,
			};
		}

		const periodToFetch = daysRange <= 7 ? StatPeriod.HOURLY : StatPeriod.DAILY;

		const aggregatedStats = await this.tursoPrismaService.monitorStats.findMany(
			{
				where: {
					monitorId,
					period: periodToFetch,
					timestamp: { gte: startDate },
					regionId,
				},
				orderBy: { timestamp: 'asc' },
				select: {
					uptimePercent: true,
					avgResponseMs: true,
					timestamp: true,
					status: true,
					regionId: true,
				},
			},
		);

		const statistics = this.calculateStatistics(aggregatedStats);

		return {
			period: periodToFetch,
			statistics,
			incidents,
			data: aggregatedStats,
		};
	}

	private calculateStatistics(logs: CalculateLogs): AnalyticsStatisticsDto {
		const p95 = calculateP95(logs);
		const uptime = calculateUptime(logs);
		const errorRate = calculateErrorRate(logs);
		const responseTime = calculateResponseTime(logs);

		return {
			p95,
			uptime,
			errorRate,
			responseTime,
		};
	}
}
