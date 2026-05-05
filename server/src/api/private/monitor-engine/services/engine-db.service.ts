import { ServiceBusClient, ServiceBusSender } from '@azure/service-bus';
import { Prisma } from '@generated/turso/client';
import { SiteStatus } from '@generated/turso/enums';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PingResultDto, ServiceBusIncedentPayload } from '../dto';
import { MonitorCacheService } from './monitor-cache.service';

@Injectable()
export class EngineDbService implements OnModuleInit, OnModuleDestroy {
	private sender: ServiceBusSender | null = null;

	constructor(
		private readonly tursoPrismaService: TursoPrismaService,
		private readonly cache: MonitorCacheService,
		private readonly sbClient: ServiceBusClient,
	) {}

	onModuleInit() {
		const queueName = 'incidents';
		this.sender = this.sbClient.createSender(queueName);
	}

	async onModuleDestroy() {
		if (this.sender) {
			await this.sender.close();
		}
	}

	async saveBatchResults(results: PingResultDto[]) {
		if (results.length === 0) return;

		const monitorIds = [...new Set(results.map((r) => r.monitorId))];
		const checkedAt = new Date();
		const checkedAtMs = checkedAt.getTime();

		const regions = this.cache.getRegions();
		const monitors = this.cache.getMonitors();
		const messagesToSend: ServiceBusIncedentPayload[] = [];

		await this.tursoPrismaService.$transaction(async (tx) => {
			const mappedRegions = new Map(regions.map((r) => [r.key, r.id]));
			const monitorMap = new Map(monitors.map((m) => [m.id, m]));

			const monitorAggregates = new Map<
				string,
				{ status: SiteStatus; nextCheckAt: number }
			>();

			const activeIncidents = await tx.monitorIncident.findMany({
				where: { monitorId: { in: monitorIds }, resolved: false },
				select: {
					id: true,
					monitorId: true,
					regionId: true,
					alertTriggered: true,
				},
			});

			const activeIncidentMap = new Map(
				activeIncidents.map((a) => [`${a.monitorId}-${a.regionId}`, a]),
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
					? Math.min(30, monitor.checkIntervalSeconds)
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
				const activeIncident = activeIncidentMap.get(incidentKey);

				if (isDown && !activeIncident) {
					incidentsToCreate.push({
						monitorId,
						regionId,
						errorMessage: result.errorMessage || null,
						statusCode: result.statusCode || null,
						triggerLogId: logMap.get(incidentKey) || null,
					});
				} else if (status === SiteStatus.UP && activeIncident) {
					incidentsToResolveIds.push(activeIncident.id);

					if (activeIncident.alertTriggered) {
						messagesToSend.push({
							body: {
								type: SiteStatus.UP,
								incidentId: activeIncident.id,
								monitorId,
								regionId,
							},
							contentType: 'application/json',
						});
					}
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
				const createdIncidents = await tx.monitorIncident.createManyAndReturn({
					data: incidentsToCreate,
				});

				const scheduledEnqueueTimeUtc = new Date(Date.now() + 60 * 1000);

				for (const incedent of createdIncidents) {
					messagesToSend.push({
						body: {
							type: SiteStatus.DOWN,
							incidentId: incedent.id,
							monitorId: incedent.monitorId,
							regionId: incedent.regionId,
						},
						contentType: 'application/json',
						scheduledEnqueueTimeUtc,
					});
				}
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

		if (messagesToSend.length > 0 && this.sender) {
			await this.sender.sendMessages(messagesToSend);
		}
	}
}
