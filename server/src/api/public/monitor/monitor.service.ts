import { Injectable, NotFoundException } from '@nestjs/common';
import { SiteStatus } from 'generated/prisma/enums';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ERROR_MESSAGES } from 'src/libs/constants';
import { calculateUptime } from 'src/libs/utils';
import { formatResult } from 'src/libs/utils/calculates/format-result.util';
import { CreateMonitorDto, MonitorTimelineDto, UpdateMonitorDto } from './dto';
import { LogEntry } from './interfaces';

@Injectable()
export class MonitorService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(userId: string, dto: CreateMonitorDto) {
		const {
			name,
			url,
			checkIntervalSeconds,
			lastCheckedAt,
			lastStatus,
			isActive,
			projectId,
		} = dto;

		const monitor = await this.prismaService.monitor.create({
			data: {
				name,
				url,
				checkIntervalSeconds,
				lastCheckedAt,
				lastStatus,
				isActive,
				projectId: projectId || null,
				userId,
			},
		});

		return monitor;
	}

	async findAll(userId: string) {
		const targetHours = 24;

		const monitors = await this.prismaService.monitor.findMany({
			where: { userId },
			include: {
				monitorStats: {
					where: {
						period: 'HOURLY',
						timestamp: {
							gt: new Date(Date.now() - targetHours * 60 * 60 * 1000),
						},
					},
					orderBy: { timestamp: 'desc' },
				},
			},
		});

		const mappedMonitors = monitors.map((monitor) => {
			const { monitorStats, ...rest } = monitor;

			const statsCount = monitorStats.length;

			let calculatedUptime: number;

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

			return {
				...rest,
				uptime: formatResult(calculatedUptime),
			};
		});

		return mappedMonitors;
	}

	async findById(userId: string, id: string) {
		const targetHours = 24;

		const endDate = new Date();
		const startDate = new Date(
			endDate.getTime() - targetHours * 60 * 60 * 1000,
		);

		const monitor = await this.prismaService.monitor.findUnique({
			where: { id, userId },
			include: {
				regionConfigs: {
					where: { isActive: true },
					orderBy: { createdAt: 'asc' },
					select: {
						_count: true,
						region: {
							select: {
								name: true,
								key: true,
							},
						},
					},
				},
				monitorLogs: {
					where: {
						createdAt: {
							gte: startDate,
							lte: endDate,
						},
					},
					orderBy: { createdAt: 'asc' },
					select: {
						monitorId: true,
						status: true,
						responseTimeMs: true,
						createdAt: true,
						errorMessage: true,
						region: {
							select: { key: true, name: true },
						},
					},
				},
			},
		});

		if (!monitor)
			throw new NotFoundException(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND);

		const { regionConfigs, monitorLogs, userId: _, ...rest } = monitor;

		const timelineLogs = monitorLogs.map((log) => ({
			status: log.status,
			responseTimeMs: log.responseTimeMs || 0,
			createdAt: log.createdAt,
		}));

		const allUnknownOrEmpty =
			timelineLogs.length === 0 ||
			timelineLogs.every((log) => log.status === SiteStatus.UNKNOWN);

		let timeline: MonitorTimelineDto[];

		if (allUnknownOrEmpty) {
			timeline = Array.from({ length: targetHours }, (_, index) => ({
				timestamp: new Date(
					endDate.getTime() - (targetHours - 1 - index) * 60 * 60 * 1000,
				),
				status: SiteStatus.UNKNOWN,
			}));
		} else {
			timeline = this.buildRollingTimeline(timelineLogs, endDate, targetHours);
		}

		const mappedRegions = regionConfigs.map((config) => ({
			...config.region,
		}));

		const uptime = calculateUptime(monitorLogs);

		return { ...rest, uptime, timeline, regions: mappedRegions };
	}

	async update(id: string, userId: string, dto: UpdateMonitorDto) {
		const {
			name,
			url,
			checkIntervalSeconds,
			isActive,
			nextCheckAt,
			lastCheckedAt,
			lastStatus,
			projectId,
		} = dto;

		const monitor = await this.ownerCheck(id, userId);

		const updatedMonitor = await this.prismaService.monitor.update({
			where: { id: monitor.id, userId },
			data: {
				name,
				url,
				checkIntervalSeconds,
				isActive,
				nextCheckAt,
				lastCheckedAt,
				lastStatus,
				projectId,
			},
		});

		return updatedMonitor;
	}

	async remove(id: string, userId: string) {
		const monitor = await this.ownerCheck(id, userId);

		await this.prismaService.monitor.delete({
			where: { id: monitor.id, userId },
		});

		return true;
	}

	private async ownerCheck(id: string, userId: string) {
		const monitor = await this.prismaService.monitor.findUnique({
			where: { id, userId },
		});

		if (!monitor)
			throw new NotFoundException(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND);

		return monitor;
	}

	private buildRollingTimeline(
		logs: LogEntry[],
		endTime: Date,
		hours: number,
	): MonitorTimelineDto[] {
		const buckets = Array.from({ length: hours }, (_, index) => {
			return {
				timestamp: new Date(endTime.getTime() - index * 60 * 60 * 1000),
				statuses: [] as SiteStatus[],
			};
		});

		for (const log of logs) {
			const diffMs = endTime.getTime() - log.createdAt.getTime();
			const hoursAgo = Math.floor(diffMs / (60 * 60 * 1000));
			const bucketIndex = hours - 1 - hoursAgo;

			if (bucketIndex >= 0 && bucketIndex < hours) {
				buckets[bucketIndex].statuses.push(log.status);
			}
		}

		const oldestKnownStatus =
			logs.find((log) => log.status !== SiteStatus.UNKNOWN)?.status ??
			SiteStatus.UNKNOWN;

		let previousStatus = oldestKnownStatus;

		return buckets.map((bucket) => {
			const isUp =
				bucket.statuses.length > 0
					? bucket.statuses.every(
							(status) =>
								status === SiteStatus.UP || status !== SiteStatus.UNKNOWN,
						)
					: false;

			let currentStatus =
				bucket.statuses.length === 0
					? SiteStatus.UNKNOWN
					: isUp
						? SiteStatus.UP
						: SiteStatus.DOWN;

			if (currentStatus === SiteStatus.UNKNOWN) {
				currentStatus = previousStatus;
			} else {
				previousStatus = currentStatus;
			}

			return {
				timestamp: bucket.timestamp,
				status: currentStatus,
			};
		});
	}
}
