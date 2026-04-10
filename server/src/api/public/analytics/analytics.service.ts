import { Injectable, NotFoundException } from '@nestjs/common';
import { StatPeriod } from 'generated/prisma/enums';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ERROR_MESSAGES } from 'src/libs/constants';
import { CalculateLogs } from 'src/libs/types';
import {
	calculateErrorRate,
	calculateP95,
	calculateResponseTime,
	calculateUptime,
} from 'src/libs/utils';
import { AnalyticsQueryDto } from './dto';

@Injectable()
export class AnalyticsService {
	constructor(private readonly prismaService: PrismaService) {}

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

		const accidents = await this.prismaService.monitorAccident.findMany({
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
				alertsTriggered: true,
			},
		});

		if (daysRange <= 1) {
			const rawLogs = await this.prismaService.monitorLog.findMany({
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
				accidents,
				data: rawLogs,
			};
		}

		const periodToFetch = daysRange <= 7 ? StatPeriod.HOURLY : StatPeriod.DAILY;

		const aggregatedStats = await this.prismaService.monitorStats.findMany({
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
				regionId: true,
				status: true,
			},
		});

		const statistics = this.calculateStatistics(aggregatedStats);

		return {
			period: periodToFetch,
			statistics,
			accidents,
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
