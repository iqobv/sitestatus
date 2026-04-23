import { StatPeriod } from '@generated/turso/enums';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import { CalculateLogs } from '@libs/types';
import {
	calculateErrorRate,
	calculateP95,
	calculateResponseTime,
	calculateUptime,
} from '@libs/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AnalyticsQueryDto } from './dto';

@Injectable()
export class AnalyticsService {
	constructor(
		private readonly prismaService: PgPrismaService,
		private readonly tursoPrismaService: TursoPrismaService,
	) {}

	async getAnalyticsByMonitorId(monitorId: string, query: AnalyticsQueryDto) {
		const { daysRange = 1, region = 'global' } = query;

		const now = new Date();
		const startDate = new Date(now);
		startDate.setUTCDate(startDate.getUTCDate() - daysRange);

		let regionId: string | undefined;

		if (region !== 'global') {
			const foundRegion = await this.prismaService.region.findUnique({
				where: { key: region.toLowerCase() },
			});

			if (!foundRegion)
				throw new NotFoundException(ERROR_MESSAGES.REGION.REGION_NOT_FOUND);

			regionId = foundRegion.id;
		}

		const incidents = await this.tursoPrismaService.monitorIncident.findMany({
			where: { monitorId, regionId },
			orderBy: { createdAt: 'desc' },
			select: {
				id: true,
				monitorId: true,
				regionId: true,
				statusCode: true,
				createdAt: true,
				errorMessage: true,
				resolved: true,
				resolvedAt: true,
				alertSentAt: true,
				alertTriggered: true,
			},
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

	private calculateStatistics(logs: CalculateLogs) {
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
