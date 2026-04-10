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

		const nextCheckTime = new Date();
		nextCheckTime.setUTCSeconds(nextCheckTime.getUTCSeconds() + 15);

		const monitors = await this.prismaService.monitor.findMany({
			where: {
				isActive: true,
				regionConfigs: {
					some: { regionId: region.id, nextCheckAt: { lte: nextCheckTime } },
				},
			},
		});

		return monitors.map((task) => ({
			id: task.id,
			url: task.url,
		}));
	}

	async saveResults(
		results: PingResultDto[],
		regionKey: string,
	): Promise<void> {
		if (results.length === 0) {
			return;
		}

		const region = await this.regionService.getRegionByKey(regionKey);
		const monitorIds = results.map((r) => r.monitorId);
		const checkedAt = new Date();

		await this.prismaService.$transaction(async (tx) => {
			const monitors = await tx.monitor.findMany({
				where: { id: { in: monitorIds } },
				select: { id: true, checkIntervalSeconds: true },
			});

			const activeAccidents = await tx.monitorAccident.findMany({
				where: {
					regionId: region.id,
					monitorId: { in: monitorIds },
					resolved: false,
				},
				select: { id: true, monitorId: true },
			});

			const monitorMap = new Map(monitors.map((m) => [m.id, m]));
			const activeAccidentMap = new Map(
				activeAccidents.map((a) => [a.monitorId, a]),
			);

			const logsData = results.map((r) => ({
				monitorId: r.monitorId,
				regionId: region.id,
				status: SiteStatus.DOWN,
				statusCode: 404,
				responseTimeMs: r.responseTimeMs,
				errorMessage: r.errorMessage,
			}));

			const monitorLogs = await tx.monitorLog.createManyAndReturn({
				data: logsData,
				skipDuplicates: true,
			});

			const logMap = new Map(monitorLogs.map((log) => [log.monitorId, log.id]));

			const accidentsToCreate: {
				monitorId: string;
				regionId: string;
				errorMessage: string | null;
				statusCode: number | null;
				triggerLogId: bigint | null;
			}[] = [];

			const accidentsToResolveIds: string[] = [];
			const monitorRegionUpserts: Promise<unknown>[] = [];

			const statusGroups: Record<SiteStatus, string[]> = {
				[SiteStatus.UP]: [],
				[SiteStatus.DOWN]: [],
				[SiteStatus.UNKNOWN]: [],
			};

			for (const result of results) {
				const { status } = result;

				const monitor = monitorMap.get(result.monitorId);
				if (!monitor) {
					continue;
				}

				statusGroups[status].push(monitor.id);

				const isDown =
					status === SiteStatus.DOWN || status === SiteStatus.UNKNOWN;
				const nextInterval = isDown
					? Math.min(60, monitor.checkIntervalSeconds)
					: monitor.checkIntervalSeconds;

				const nextCheckAt = new Date(checkedAt.getTime() + nextInterval * 1000);

				const monitorRangeData = {
					// lastStatus: status,
					lastStatus: status,
					lastCheckedAt: checkedAt,
					nextCheckAt,
				};

				monitorRegionUpserts.push(
					tx.monitorRegion.upsert({
						where: {
							monitorId_regionId: {
								monitorId: monitor.id,
								regionId: region.id,
							},
						},
						create: {
							monitorId: monitor.id,
							regionId: region.id,
							isActive: true,
							...monitorRangeData,
						},
						update: monitorRangeData,
					}),
				);

				const activeAccidentId = activeAccidentMap.get(monitor.id)?.id;

				if (isDown && !activeAccidentId) {
					accidentsToCreate.push({
						monitorId: result.monitorId,
						regionId: region.id,
						errorMessage: result.errorMessage || null,
						statusCode: result.statusCode || null,
						triggerLogId: logMap.get(result.monitorId) || null,
					});
				} else if (
					(status as unknown as SiteStatus) === SiteStatus.UP &&
					activeAccidentId
				) {
					accidentsToResolveIds.push(activeAccidentId);
				}
			}

			const updatePromises: Promise<unknown>[] = [...monitorRegionUpserts];

			if (accidentsToCreate.length > 0) {
				updatePromises.push(
					tx.monitorAccident.createMany({ data: accidentsToCreate }),
				);
			}

			if (accidentsToResolveIds.length > 0) {
				updatePromises.push(
					tx.monitorAccident.updateMany({
						where: { id: { in: accidentsToResolveIds } },
						data: { resolved: true, resolvedAt: checkedAt },
					}),
				);
			}

			const statusUpdates = Object.entries(statusGroups)
				.filter(([, ids]) => ids.length > 0)
				.map(([status, ids]) =>
					tx.monitor.updateMany({
						where: { id: { in: ids } },
						data: {
							lastStatus: status as SiteStatus,
							lastCheckedAt: checkedAt,
						},
					}),
				);

			updatePromises.push(...statusUpdates);

			await Promise.all(updatePromises);
		});
	}
}
