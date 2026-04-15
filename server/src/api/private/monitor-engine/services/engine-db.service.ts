import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { SiteStatus } from 'generated/prisma/enums';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { PingResultDto } from '../dto';

@Injectable()
export class EngineDbService {
	constructor(private readonly prismaService: PrismaService) {}

	public async saveBatchResults(results: PingResultDto[]): Promise<void> {
		if (results.length === 0) {
			return;
		}

		const monitorIds = [...new Set(results.map((r) => r.monitorId))];
		const checkedAt = new Date();

		await this.prismaService.$transaction(async (tx) => {
			const regions = await tx.region.findMany({
				where: { isActive: true },
				select: { id: true, key: true },
			});

			const mappedRegions = new Map<string, string>();

			for (const region of regions) {
				mappedRegions.set(region.key, region.id);
			}

			const monitors = await tx.monitor.findMany({
				where: { id: { in: monitorIds } },
				select: { id: true, checkIntervalSeconds: true },
			});

			const activeIncidents = await tx.monitorIncident.findMany({
				where: {
					monitorId: { in: monitorIds },
					resolved: false,
				},
				select: { id: true, monitorId: true, regionId: true },
			});

			const monitorMap = new Map(monitors.map((m) => [m.id, m]));
			const activeIncidentMap = new Map(
				activeIncidents.map((a) => [`${a.monitorId}-${a.regionId}`, a.id]),
			);

			const logsData = results.map((r) => ({
				monitorId: r.monitorId,
				regionId: mappedRegions.get(r.region)!,
				status: r.status,
				statusCode: r.statusCode || null,
				responseTimeMs: r.responseTimeMs,
				errorMessage: r.errorMessage || null,
			}));

			const monitorLogs = await tx.monitorLog.createManyAndReturn({
				data: logsData,
				skipDuplicates: true,
			});

			const logMap = new Map(
				monitorLogs.map((log) => [`${log.monitorId}-${log.regionId}`, log.id]),
			);

			const incidentsToCreate: {
				monitorId: string;
				regionId: string;
				errorMessage: string | null;
				statusCode: number | null;
				triggerLogId: bigint | null;
			}[] = [];

			const incidentsToResolveIds: string[] = [];
			const monitorRegionUpserts: Promise<unknown>[] = [];

			const statusGroups: Record<SiteStatus, string[]> = {
				[SiteStatus.UP]: [],
				[SiteStatus.DOWN]: [],
				[SiteStatus.UNKNOWN]: [],
			};

			for (const result of results) {
				const { status, region } = result;
				const siteStatus = status;
				const regionId = mappedRegions.get(region)!;

				const monitor = monitorMap.get(result.monitorId);
				if (!monitor) {
					continue;
				}

				statusGroups[siteStatus].push(monitor.id);

				const isDown =
					siteStatus === SiteStatus.DOWN || siteStatus === SiteStatus.UNKNOWN;
				const randomTimeout = Math.floor(Math.random() * 30);
				const nextInterval = isDown
					? Math.min(60, monitor.checkIntervalSeconds)
					: monitor.checkIntervalSeconds + randomTimeout;

				const nextCheckAt = new Date(checkedAt.getTime() + nextInterval * 1000);

				const monitorRangeData = {
					lastStatus: siteStatus,
					lastCheckedAt: checkedAt,
					nextCheckAt,
					isQueued: false,
				} satisfies Prisma.MonitorRegionUpdateInput;

				monitorRegionUpserts.push(
					tx.monitorRegion.upsert({
						where: {
							monitorId_regionId: {
								monitorId: monitor.id,
								regionId,
							},
						},
						create: {
							monitorId: monitor.id,
							regionId,
							isActive: true,
							...monitorRangeData,
						},
						update: monitorRangeData,
					}),
				);

				const incidentKey = `${monitor.id}-${regionId}`;
				const activeIncidentId = activeIncidentMap.get(incidentKey);

				if (isDown && !activeIncidentId) {
					incidentsToCreate.push({
						monitorId: result.monitorId,
						regionId,
						errorMessage: result.errorMessage || null,
						statusCode: result.statusCode || null,
						triggerLogId: logMap.get(incidentKey) || null,
					});
				} else if (siteStatus === SiteStatus.UP && activeIncidentId) {
					incidentsToResolveIds.push(activeIncidentId);
				}
			}

			const updatePromises: Promise<unknown>[] = [...monitorRegionUpserts];

			if (incidentsToCreate.length > 0) {
				updatePromises.push(
					tx.monitorIncident.createMany({ data: incidentsToCreate }),
				);
			}

			if (incidentsToResolveIds.length > 0) {
				updatePromises.push(
					tx.monitorIncident.updateMany({
						where: { id: { in: incidentsToResolveIds } },
						data: { resolved: true, resolvedAt: checkedAt },
					}),
				);
			}

			const statusUpdates = Object.entries(statusGroups)
				.filter(([, ids]) => ids.length > 0)
				.map(([status, ids]) => {
					const uniqueIds = [...new Set(ids)];
					return tx.monitor.updateMany({
						where: { id: { in: uniqueIds } },
						data: {
							lastStatus: status as SiteStatus,
							lastCheckedAt: checkedAt,
						},
					});
				});

			updatePromises.push(...statusUpdates);

			await Promise.all(updatePromises);
		});
	}
}
