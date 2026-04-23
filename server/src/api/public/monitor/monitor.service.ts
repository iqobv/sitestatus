import { CACHE_EMIT_EVENTS } from '@api/private/monitor-engine/constants';
import { MonitorUpdatePayload } from '@api/private/monitor-engine/interfaces';
import { Monitor, Prisma } from '@generated/postgres/client';
import { SiteStatus } from '@generated/turso/enums';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { calculateUptime, formatResult } from '@libs/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AnalyticsRawDataDto } from '../analytics/dto';
import { RegionService } from '../region/region.service';
import { CreateMonitorDto, MonitorTimelineDto, UpdateMonitorDto } from './dto';
import { LogEntry } from './interfaces';

@Injectable()
export class MonitorService {
	constructor(
		private readonly pgPrismaService: PgPrismaService,
		private readonly tursoPrismaService: TursoPrismaService,
		private readonly eventEmitter: EventEmitter2,
		private readonly regionService: RegionService,
	) {}

	async create(userId: string, dto: CreateMonitorDto) {
		const { regions, projectId, ...monitorData } = dto;

		const safeRegions = regions || [];

		const isRegionsActive =
			await this.regionService.isRegionsActive(safeRegions);

		if (!isRegionsActive) {
			throw new NotFoundException(ERROR_MESSAGES.REGION.REGION_NOT_FOUND);
		}

		const monitor = await this.pgPrismaService.$transaction(async (tx) => {
			const createdMonitor = await tx.monitor.create({
				data: {
					...monitorData,
					projectId: projectId || null,
					userId,
				},
			});

			if (safeRegions.length > 0) {
				await tx.monitorRegionConfig.createMany({
					data: safeRegions.map((regionId) => ({
						monitorId: createdMonitor.id,
						regionId,
						isActive: true,
					})),
				});
			}

			const dbRegions = await this.getMonitorRegionIds(createdMonitor.id, tx);

			return { ...createdMonitor, regions: dbRegions };
		});

		const { regions: resultRegions, ...createdMonitor } = monitor;

		this.emitUpdateEvent(createdMonitor, resultRegions, true);

		return createdMonitor;
	}

	async findAll(userId: string, projectId?: string) {
		const targetHours = 24;

		const monitors = await this.pgPrismaService.monitor.findMany({
			where: { userId, projectId: projectId || null },
			orderBy: { createdAt: 'desc' },
		});

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

	async findByIdFull(userId: string, id: string) {
		const targetHours = 24;

		const endDate = new Date();
		const startDate = new Date(
			endDate.getTime() - targetHours * 60 * 60 * 1000,
		);

		const monitor = await this.pgPrismaService.monitor.findUnique({
			where: { id, userId },
			include: {
				regionConfigs: {
					where: { isActive: true },
					orderBy: { createdAt: 'asc' },
					select: {
						region: {
							select: {
								name: true,
								key: true,
							},
						},
					},
				},
			},
		});

		const monitorState = await this.tursoPrismaService.monitorState.findFirst({
			where: { monitorId: id },
			select: { lastStatus: true, lastCheckedAt: true, nextCheckAt: true },
		});

		const monitorLogs = await this.tursoPrismaService.monitorLog.findMany({
			where: {
				monitorId: id,
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
				regionId: true,
			},
		});

		if (!monitor)
			throw new NotFoundException(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND);

		const { regionConfigs, userId: _, ...rest } = monitor;

		const timelineLogs: AnalyticsRawDataDto[] = monitorLogs.map((log) => ({
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

		if (allUnknownOrEmpty || !monitor.isActive) {
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

		return {
			...rest,
			...monitorState,
			uptime,
			timeline,
			regions: mappedRegions,
		};
	}

	async findById(userId: string, id: string) {
		const monitor = await this.pgPrismaService.monitor.findUnique({
			where: { id, userId },
			include: {
				regionConfigs: {
					where: { isActive: true },
					select: { regionId: true },
				},
			},
		});

		const monitorState = await this.tursoPrismaService.monitorState.findFirst({
			where: { monitorId: id },
			select: {
				lastStatus: true,
				lastCheckedAt: true,
				nextCheckAt: true,
			},
		});

		if (!monitor)
			throw new NotFoundException(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND);

		const { regionConfigs, ...rest } = monitor;

		const mappedMonitor = {
			...rest,
			...monitorState,
			regions: regionConfigs.map((config) => config.regionId),
		};

		return mappedMonitor;
	}

	async update(id: string, userId: string, dto: UpdateMonitorDto) {
		const { regions, ...monitorData } = dto;

		const monitor = await this.ownerCheck(id, userId);

		const result = await this.pgPrismaService.$transaction(async (tx) => {
			const updatedMonitor = await tx.monitor.update({
				where: { id: monitor.id, userId },
				data: {
					...monitorData,
				},
			});

			if (regions) {
				await Promise.all([
					tx.monitorRegionConfig.updateMany({
						where: { monitorId: monitor.id, regionId: { notIn: regions } },
						data: { isActive: false },
					}),
					tx.monitorRegionConfig.createMany({
						data: regions.map((regionId) => ({
							monitorId: monitor.id,
							regionId,
							isActive: true,
						})),
						skipDuplicates: true,
					}),
					tx.monitorRegionConfig.updateMany({
						where: { monitorId: monitor.id, regionId: { in: regions } },
						data: { isActive: true },
					}),
				]);
			}

			const dbRegions = await this.getMonitorRegionIds(monitor.id, tx);

			return {
				regions: dbRegions,
				...updatedMonitor,
			};
		});

		const { regions: resultRegions, ...resultMonitor } = result;

		this.emitUpdateEvent(resultMonitor, resultRegions);

		return result;
	}

	async updateActiveStatus(id: string, userId: string) {
		const monitor = await this.ownerCheck(id, userId);

		const updatedMonitor = await this.pgPrismaService.monitor.update({
			where: { id: monitor.id, userId },
			data: { isActive: !monitor.isActive },
			include: {
				regionConfigs: {
					where: { isActive: true },
					select: { regionId: true },
				},
			},
		});

		const { regionConfigs, ...result } = updatedMonitor;

		this.emitUpdateEvent(
			result,
			regionConfigs.map((config) => config.regionId),
		);

		return result;
	}

	async remove(id: string, userId: string) {
		const monitor = await this.ownerCheck(id, userId);

		await this.pgPrismaService.monitor.delete({
			where: { id: monitor.id, userId },
		});

		this.eventEmitter.emit(CACHE_EMIT_EVENTS.MONITOR.DELETED, id);

		return SUCCESS_MESSAGES.MONITOR.MONITOR_DELETED;
	}

	private async ownerCheck(id: string, userId: string) {
		const monitor = await this.pgPrismaService.monitor.findUnique({
			where: { id, userId },
		});

		if (!monitor)
			throw new NotFoundException(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND);

		return monitor;
	}

	private emitUpdateEvent(
		monitor: Monitor,
		regionIds: string[],
		isNew: boolean = false,
	) {
		const emitPayload: MonitorUpdatePayload = {
			id: monitor.id,
			checkIntervalSeconds: monitor.checkIntervalSeconds,
			isActive: monitor.isActive,
			method: monitor.method,
			url: monitor.url,
			regionIds: regionIds,
			isNew,
		};

		this.eventEmitter.emit(CACHE_EMIT_EVENTS.MONITOR.UPDATED, emitPayload);
	}

	private async getMonitorRegionIds(
		monitorId: string,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.pgPrismaService;

		const dbRegions = await prisma.monitorRegionConfig.findMany({
			where: { monitorId, isActive: true },
			select: { regionId: true },
		});

		return dbRegions.map((r) => r.regionId);
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
