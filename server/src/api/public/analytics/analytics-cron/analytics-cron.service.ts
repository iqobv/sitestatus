import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SiteStatus, StatPeriod } from 'generated/prisma/enums';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class AnalyticsCronService {
	constructor(private readonly prismaService: PrismaService) {}

	@Cron(CronExpression.EVERY_HOUR)
	async aggregateHourly() {
		const now = new Date();
		now.setUTCMinutes(0, 0, 0);
		const start = new Date(now.getTime() - 60 * 60 * 1000);

		await this.runAggregation(start, now, StatPeriod.HOURLY);
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async aggregateDaily() {
		const now = new Date();
		now.setUTCHours(0, 0, 0, 0);
		const start = new Date(now.getTime() - 24 * 60 * 60 * 1000);

		await this.runAggregation(start, now, StatPeriod.DAILY);
	}

	async runAggregation(start: Date, end: Date, period: StatPeriod) {
		const totalStats = await this.prismaService.monitorLog.groupBy({
			by: ['monitorId', 'regionId'],
			where: { createdAt: { gte: start, lt: end } },
			_avg: { responseTimeMs: true },
			_count: { status: true },
		});

		if (totalStats.length === 0) {
			return;
		}

		const upStats = await this.prismaService.monitorLog.groupBy({
			by: ['monitorId', 'regionId'],
			where: {
				createdAt: { gte: start, lt: end },
				status: SiteStatus.UP,
			},
			_count: { status: true },
		});

		const upCountMap = new Map<string, number>();
		for (const stat of upStats) {
			upCountMap.set(`${stat.monitorId}_${stat.regionId}`, stat._count.status);
		}

		const statsToInsert = totalStats.map((stat) => {
			const key = `${stat.monitorId}_${stat.regionId}`;
			const upCount = upCountMap.get(key) || 0;
			const uptimePercent =
				stat._count.status > 0 ? (upCount / stat._count.status) * 100 : 0;
			const status: SiteStatus =
				uptimePercent < 80 ? SiteStatus.DOWN : SiteStatus.UP;

			return {
				monitorId: stat.monitorId,
				regionId: stat.regionId,
				avgResponseMs: Math.round(stat._avg.responseTimeMs || 0),
				uptimePercent,
				timestamp: start,
				period: period,
				status,
			};
		});

		await this.prismaService.monitorStats.createMany({
			data: statsToInsert,
			skipDuplicates: true,
		});
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async cleanupLogsAndStats() {
		const now = new Date();

		const oneDayAgo = new Date(now);
		oneDayAgo.setUTCDate(oneDayAgo.getUTCDate() - 1);

		const sevenDaysAgo = new Date(now);
		sevenDaysAgo.setUTCDate(sevenDaysAgo.getUTCDate() - 7);

		const thirtyDaysAgo = new Date(now);
		thirtyDaysAgo.setUTCDate(thirtyDaysAgo.getUTCDate() - 30);

		await this.prismaService.monitorLog.deleteMany({
			where: {
				createdAt: { lt: oneDayAgo },
				status: SiteStatus.UP,
			},
		});

		await this.prismaService.monitorLog.deleteMany({
			where: { createdAt: { lt: thirtyDaysAgo } },
		});

		await this.prismaService.monitorStats.deleteMany({
			where: {
				period: StatPeriod.HOURLY,
				timestamp: { lt: sevenDaysAgo },
			},
		});

		const ninetyDaysAgo = new Date(now);
		ninetyDaysAgo.setUTCDate(ninetyDaysAgo.getUTCDate() - 90);

		await this.prismaService.monitorStats.deleteMany({
			where: {
				period: StatPeriod.DAILY,
				timestamp: { lt: ninetyDaysAgo },
			},
		});
	}
}
