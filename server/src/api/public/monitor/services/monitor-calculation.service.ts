import { AnalyticsRawDataDto } from '@api/public/analytics/dto';
import { Monitor } from '@generated/postgres/client';
import { SiteStatus } from '@generated/turso/enums';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { calculateUptime, formatResult } from '@libs/utils';
import { Injectable } from '@nestjs/common';
import { MonitorTimelineDto } from '../dto';
import { LogEntry } from '../interfaces';

@Injectable()
export class MonitorCalculationService {
	constructor(private readonly tursoPrismaService: TursoPrismaService) {}

	async calculateMonitorStats(monitors: Monitor[], targetHours: number) {
		const monitorStates = await this.tursoPrismaService.monitorState.findMany({
			where: { monitorId: { in: monitors.map((m) => m.id) } },
		});

		const monitorStats = await this.tursoPrismaService.monitorStats.findMany({
			where: {
				monitorId: { in: monitors.map((m) => m.id) },
				period: 'HOURLY',
				timestamp: {
					gt: new Date(Date.now() - targetHours * 60 * 60 * 1000),
				},
			},
			orderBy: { timestamp: 'desc' },
		});

		const finalMonitors = monitors.map((monitor) => {
			const monitorState = monitorStates.find(
				(ms) => ms.monitorId === monitor.id,
			);

			return {
				...monitor,
				nextCheckAt: monitorState?.nextCheckAt || new Date(),
				lastCheckedAt: monitorState?.lastCheckedAt || null,
				lastStatus: monitorState?.lastStatus || SiteStatus.UNKNOWN,
				monitorStats: monitorStats.filter(
					(stat) => stat.monitorId === monitor.id,
				),
			};
		});

		const mappedMonitors = finalMonitors.map((monitor) => {
			const { monitorStats, ...rest } = monitor;

			const statsCount = monitorStats.length;

			let calculatedUptime: number;

			if (monitor.isActive) {
				if (statsCount === 0) {
					calculatedUptime = 100;
				} else {
					const currentSum = monitorStats.reduce(
						(sum, stat) => sum + stat.uptimePercent,
						0,
					);

					if (statsCount < targetHours) {
						const missingCount = targetHours - statsCount;
						const oldestStat = monitorStats[statsCount - 1];
						const fallbackUptime = oldestStat.uptimePercent;

						const totalSum = currentSum + missingCount * fallbackUptime;
						calculatedUptime = totalSum / targetHours;
					} else {
						calculatedUptime = currentSum / statsCount;
					}
				}
			} else {
				calculatedUptime = 0;
			}

			return {
				...rest,
				uptime: formatResult(calculatedUptime),
			};
		});

		return mappedMonitors;
	}

	buildRollingTimeline(
		logs: LogEntry[],
		endTime: Date,
		hours: number,
		lastKnownStatus: SiteStatus = SiteStatus.UNKNOWN,
	): MonitorTimelineDto[] {
		const buckets = Array.from({ length: hours }, (_, index) => {
			return {
				timestamp: new Date(
					endTime.getTime() - (hours - index) * 60 * 60 * 1000,
				),
				statuses: [] as SiteStatus[],
			};
		});

		for (const log of logs) {
			const logTime = log.createdAt.getTime();
			for (const bucket of buckets) {
				const bucketStartTime = bucket.timestamp.getTime();
				const bucketEndTime = bucketStartTime + 60 * 60 * 1000;

				if (logTime >= bucketStartTime && logTime < bucketEndTime) {
					bucket.statuses.push(log.status);
					break;
				}
			}
		}

		const oldestKnownStatus =
			logs.find((log) => log.status !== SiteStatus.UNKNOWN)?.status ??
			lastKnownStatus;

		let previousStatus = oldestKnownStatus;

		return buckets.map((bucket) => {
			let currentStatus: SiteStatus;
			let calculatedUptime: number;

			if (bucket.statuses.length === 0) {
				currentStatus = previousStatus;
				calculatedUptime = currentStatus === SiteStatus.UP ? 100 : 0;
			} else {
				const isUp = bucket.statuses.every(
					(status) => status === SiteStatus.UP || status !== SiteStatus.UNKNOWN,
				);

				currentStatus = isUp ? SiteStatus.UP : SiteStatus.DOWN;
				previousStatus = currentStatus;

				const upCount = bucket.statuses.filter(
					(s) => s === SiteStatus.UP,
				).length;
				calculatedUptime = (upCount / bucket.statuses.length) * 100;
			}

			return {
				timestamp: bucket.timestamp,
				uptime: formatResult(calculatedUptime),
				status: currentStatus,
			};
		});
	}

	calculateTimeline(
		monitor: Monitor,
		logs: AnalyticsRawDataDto[],
		targetHours: number,
		endDate: Date,
		lastStatus: SiteStatus = SiteStatus.UNKNOWN,
	) {
		const timelineLogs: AnalyticsRawDataDto[] = logs.map((log) => ({
			status: log.status,
			responseTimeMs: log.responseTimeMs || 0,
			errorMessage: log.errorMessage || '',
			createdAt: log.createdAt,
			regionId: log.regionId,
		}));

		const allUnknownOrEmpty =
			timelineLogs.length === 0 ||
			timelineLogs.every((log) => log.status === SiteStatus.UNKNOWN);

		let timeline: MonitorTimelineDto[];

		if (!monitor.isActive) {
			timeline = Array.from({ length: targetHours }, (_, index) => ({
				timestamp: new Date(
					endDate.getTime() - (targetHours - index) * 60 * 60 * 1000,
				),
				uptime: 'N/A',
				status: SiteStatus.UNKNOWN,
			}));
		} else if (allUnknownOrEmpty) {
			const fallbackUptimeStr =
				lastStatus === SiteStatus.UNKNOWN
					? 'N/A'
					: formatResult(lastStatus === SiteStatus.UP ? 100 : 0);

			timeline = Array.from({ length: targetHours }, (_, index) => ({
				timestamp: new Date(
					endDate.getTime() - (targetHours - index) * 60 * 60 * 1000,
				),
				uptime: fallbackUptimeStr,
				status: lastStatus,
			}));
		} else {
			timeline = this.buildRollingTimeline(
				timelineLogs,
				endDate,
				targetHours,
				lastStatus,
			);
		}

		const calculatedOverallUptime = calculateUptime(logs);
		const finalUptime =
			allUnknownOrEmpty && monitor.isActive && lastStatus === SiteStatus.UP
				? formatResult(100)
				: calculatedOverallUptime;

		return {
			uptime: finalUptime,
			timeline,
		};
	}
}
