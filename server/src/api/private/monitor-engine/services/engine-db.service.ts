import { Prisma } from '@generated/turso/client';
import { SiteStatus } from '@generated/turso/enums';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { Injectable } from '@nestjs/common';
import { PingResultDto } from '../dto';
import { MonitorCacheService } from './monitor-cache.service';

@Injectable()
export class EngineDbService {
	constructor(
		private readonly tursoPrismaService: TursoPrismaService,
		private readonly cache: MonitorCacheService,
	) {}

	public async saveBatchResults(results: PingResultDto[]): Promise<void> {
		if (results.length === 0) return;

		const monitorIds = [...new Set(results.map((r) => r.monitorId))];
		const checkedAt = new Date();
		const checkedAtMs = checkedAt.getTime();

		const regions = this.cache.getRegions();
		const monitors = this.cache.getMonitors();

		await this.tursoPrismaService.$transaction(async (tx) => {
			const mappedRegions = new Map(regions.map((r) => [r.key, r.id]));
			const monitorMap = new Map(monitors.map((m) => [m.id, m]));

			const monitorAggregates = new Map<
				string,
				{ status: SiteStatus; nextCheckAt: number }
			>();

			const activeIncidents = await tx.monitorIncident.findMany({
				where: { monitorId: { in: monitorIds }, resolved: false },
				select: { id: true, monitorId: true, regionId: true },
			});

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
			});
			const logMap = new Map(
				monitorLogs.map((log) => [`${log.monitorId}-${log.regionId}`, log.id]),
			);

			const incidentsToCreate: Prisma.MonitorIncidentCreateManyInput[] = [];
			const incidentsToResolveIds: string[] = [];
			const monitorRegionUpdates: Promise<unknown>[] = [];

			for (const result of results) {
				const { monitorId, status, region } = result;
				const regionId = mappedRegions.get(region);
				const monitor = monitorMap.get(monitorId);

				if (!regionId || !monitor) continue;

				const isDown =
					status === SiteStatus.DOWN || status === SiteStatus.UNKNOWN;

				const nextInterval = isDown
					? Math.min(60, monitor.checkIntervalSeconds)
					: monitor.checkIntervalSeconds;

				const calculatedNextRun = checkedAtMs + nextInterval * 1000;

				const currentAggregate = monitorAggregates.get(monitorId);
				if (
					!currentAggregate ||
					(isDown && currentAggregate.status === SiteStatus.UP)
				) {
					monitorAggregates.set(monitorId, {
						status,
						nextCheckAt: calculatedNextRun,
					});
				}

				monitorRegionUpdates.push(
					tx.monitorRegion.upsert({
						where: { monitorId_regionId: { monitorId, regionId } },
						create: {
							monitorId,
							regionId,
							lastStatus: status,
							lastCheckedAt: checkedAt,
							isQueued: false,
						},
						update: {
							lastStatus: status,
							lastCheckedAt: checkedAt,
							isQueued: false,
						},
					}),
				);

				const incidentKey = `${monitorId}-${regionId}`;
				const activeIncidentId = activeIncidentMap.get(incidentKey);

				if (isDown && !activeIncidentId) {
					incidentsToCreate.push({
						monitorId,
						regionId,
						errorMessage: result.errorMessage || null,
						statusCode: result.statusCode || null,
						triggerLogId: logMap.get(incidentKey) || null,
					});
				} else if (status === SiteStatus.UP && activeIncidentId) {
					incidentsToResolveIds.push(activeIncidentId);
				}
			}

			const stateUpdates: Promise<unknown>[] = [];

			for (const [monitorId, agg] of monitorAggregates.entries()) {
				this.cache.updateMonitorNextCheck(monitorId, agg.nextCheckAt);

				stateUpdates.push(
					tx.monitorState.update({
						where: { monitorId },
						data: {
							lastStatus: agg.status,
							lastCheckedAt: checkedAt,
							nextCheckAt: new Date(agg.nextCheckAt),
						},
					}),
				);
			}

			if (incidentsToCreate.length > 0) {
				stateUpdates.push(
					tx.monitorIncident.createMany({ data: incidentsToCreate }),
				);
			}

			if (incidentsToResolveIds.length > 0) {
				stateUpdates.push(
					tx.monitorIncident.updateMany({
						where: { id: { in: incidentsToResolveIds } },
						data: { resolved: true, resolvedAt: checkedAt },
					}),
				);
			}

			await Promise.all([...monitorRegionUpdates, ...stateUpdates]);
		});
	}
}
