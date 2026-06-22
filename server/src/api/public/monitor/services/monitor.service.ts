import { CACHE_EMIT_EVENTS } from '@api/private/monitor-engine/constants/emit-events.constants';
import { MonitorUpdatePayload } from '@api/private/monitor-engine/interfaces/cache-storage.interface';
import { Monitor, Prisma } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { paginate } from '@libs/utils/paginate.util';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RegionService } from '../../region/region.service';
import { CreateMonitorDto } from '../dto/create-monitor.dto';
import { QueryMonitorsDto } from '../dto/monitors-query.dto';
import { PaginatedMonitorsDto } from '../dto/paginated-monitors.dto';
import { UpdateMonitorDto } from '../dto/update-monitor.dto';
import { MonitorCalculationService } from './monitor-calculation.service';

@Injectable()
export class MonitorService {
	constructor(
		private readonly pgPrismaService: PgPrismaService,
		private readonly tursoPrismaService: TursoPrismaService,
		private readonly eventEmitter: EventEmitter2,
		private readonly regionService: RegionService,
		private readonly monitorCalculationService: MonitorCalculationService,
	) {}

	async create(userId: string, dto: CreateMonitorDto) {
		const { regions, projectId, ...monitorData } = dto;

		const safeRegions = regions || [];

		const isRegionsActive =
			await this.regionService.isRegionsActive(safeRegions);

		if (!isRegionsActive) {
			throw new NotFoundException(ERROR_MESSAGES.REGION.NOT_FOUND);
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

	public async findAll(
		userId: string,
		query: QueryMonitorsDto,
		projectId?: string,
	): Promise<PaginatedMonitorsDto> {
		const {
			page = 1,
			limit = 20,
			sortBy = 'createdAt',
			sortOrder = 'desc',
		} = query;

		const targetHours = 24;

		const { data, meta } = await paginate(
			{ page, limit },
			async (limit, offset) => {
				const where: Prisma.MonitorWhereInput = {
					userId,
					projectId: projectId || null,
					deletedAt: null,
				};

				const [data, total] = await this.pgPrismaService.$transaction([
					this.pgPrismaService.monitor.findMany({
						where,
						orderBy: { [sortBy]: sortOrder },
						take: limit,
						skip: offset,
					}),
					this.pgPrismaService.monitor.count({
						where,
					}),
				]);

				return { data, total };
			},
		);

		const mappedMonitors =
			await this.monitorCalculationService.calculateMonitorStats(
				data,
				targetHours,
			);

		return { data: mappedMonitors, meta };
	}

	async findAllPublicMonitors(ids: string[]) {
		const targetHours = 24;

		const endDate = new Date();
		const startDate = new Date(
			endDate.getTime() - targetHours * 60 * 60 * 1000,
		);

		const monitors = await this.pgPrismaService.monitor.findMany({
			where: { id: { in: ids }, deletedAt: null },
			orderBy: { createdAt: 'desc' },
		});

		const monitorIds = monitors.map((m) => m.id);

		const [logs, monitorStates] = await Promise.all([
			this.tursoPrismaService.monitorLog.findMany({
				where: {
					monitorId: { in: monitorIds },
					createdAt: { gte: startDate, lte: endDate },
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
			}),
			this.tursoPrismaService.monitorState.findMany({
				where: { monitorId: { in: monitorIds } },
				select: { monitorId: true, lastStatus: true },
			}),
		]);

		const result = monitors.map((monitor) => {
			const monitorLogs = logs.filter((log) => log.monitorId === monitor.id);
			const state = monitorStates.find((ms) => ms.monitorId === monitor.id);

			const { uptime, timeline } =
				this.monitorCalculationService.calculateTimeline(
					monitor,
					monitorLogs,
					targetHours,
					endDate,
					state?.lastStatus,
				);

			return {
				...monitor,
				lastStatus: state?.lastStatus || 'UNKNOWN',
				uptime,
				timeline,
			};
		});

		const mappedResult = monitors.map(
			({ userId: _userId, url: _url, ...monitor }) => ({
				...monitor,
				...result.find((r) => r.id === monitor.id),
			}),
		);

		return mappedResult;
	}

	async findByIdFull(userId: string, id: string) {
		const targetHours = 24;

		const endDate = new Date();
		const startDate = new Date(
			endDate.getTime() - targetHours * 60 * 60 * 1000,
		);

		const monitor = await this.pgPrismaService.monitor.findUnique({
			where: { id, userId, deletedAt: null },
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

		if (!monitor) throw new NotFoundException(ERROR_MESSAGES.MONITOR.NOT_FOUND);

		const { regionConfigs, userId: _, ...rest } = monitor;

		const mappedRegions = regionConfigs.map((config) => ({
			...config.region,
		}));

		const { uptime, timeline } =
			this.monitorCalculationService.calculateTimeline(
				monitor,
				monitorLogs,
				targetHours,
				endDate,
				monitorState?.lastStatus,
			);

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
			where: { id, userId, deletedAt: null },
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

		if (!monitor) throw new NotFoundException(ERROR_MESSAGES.MONITOR.NOT_FOUND);

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

		this.emitUpdateEvent(resultMonitor, resultRegions, false);

		return result;
	}

	async updateActiveStatus(id: string, userId: string) {
		const monitor = await this.ownerCheck(id, userId);

		const updatedMonitor = await this.pgPrismaService.monitor.update({
			where: { id: monitor.id, userId, deletedAt: null },
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
			true,
		);

		return result;
	}

	async remove(id: string, userId: string) {
		const monitor = await this.ownerCheck(id, userId);

		await this.pgPrismaService.monitor.update({
			where: { id: monitor.id, userId, deletedAt: null },
			data: { deletedAt: new Date(), isActive: false },
		});

		this.eventEmitter.emit(CACHE_EMIT_EVENTS.MONITOR.DELETED, id);

		return SUCCESS_MESSAGES.MONITOR.DELETED;
	}

	private async ownerCheck(id: string, userId: string) {
		const monitor = await this.pgPrismaService.monitor.findUnique({
			where: { id, userId, deletedAt: null },
		});

		if (!monitor) throw new NotFoundException(ERROR_MESSAGES.MONITOR.NOT_FOUND);

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
}
