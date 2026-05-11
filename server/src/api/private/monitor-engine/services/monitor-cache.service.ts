import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { MonitorCache, MonitorCachePayload, RegionCache } from '../interfaces';

@Injectable()
export class MonitorCacheService implements OnModuleInit {
	private readonly monitors: Map<string, MonitorCache> = new Map();
	private readonly regions: Map<string, RegionCache> = new Map();

	constructor(
		private readonly prismaService: PgPrismaService,
		private readonly tursoPrismaService: TursoPrismaService,
	) {}

	async onModuleInit() {
		await Promise.all([this.loadRegions(), this.loadMonitors()]);
	}

	private async loadRegions() {
		const dbRegions = await this.prismaService.region.findMany({
			where: { isActive: true },
			select: { id: true, key: true, name: true },
		});

		dbRegions.forEach((region) => {
			this.regions.set(region.id, region);
		});
	}

	private async loadMonitors() {
		const [dbMonitors, monitorStates] = await Promise.all([
			this.prismaService.monitor.findMany({
				where: { isActive: true },
				select: {
					id: true,
					url: true,
					method: true,
					checkIntervalSeconds: true,
					regionConfigs: {
						where: { isActive: true },
						select: { regionId: true },
					},
				},
			}),
			this.tursoPrismaService.monitorState.findMany(),
		]);

		const now = new Date();

		const stateMap = new Map(
			monitorStates.map((state) => [state.monitorId, state]),
		);

		dbMonitors.forEach((monitor) => {
			const regionIds = monitor.regionConfigs.map((config) => config.regionId);
			const state = stateMap.get(monitor.id);

			this.monitors.set(monitor.id, {
				...monitor,
				regionIds,
				nextCheckAt:
					state && state.nextCheckAt
						? new Date(state.nextCheckAt).getTime()
						: now.getTime() + monitor.checkIntervalSeconds * 1000,
			});
		});
	}

	getMonitors() {
		return Array.from(this.monitors.values());
	}

	upsertMonitor(data: MonitorCachePayload, isNew: boolean = false) {
		const existing = this.monitors.get(data.id);

		this.monitors.set(data.id, {
			...data,
			nextCheckAt: existing
				? existing.nextCheckAt
				: isNew
					? Date.now()
					: Date.now() + data.checkIntervalSeconds * 1000,
		});
	}

	updateMonitorNextCheck(id: string, nextCheckAt: number) {
		const monitor = this.monitors.get(id);
		if (monitor) {
			this.monitors.set(id, { ...monitor, nextCheckAt });
		}
	}

	removeMonitor(id: string) {
		this.monitors.delete(id);
	}

	getRegions() {
		return Array.from(this.regions.values());
	}

	getRegionByKey(key: string) {
		return Array.from(this.regions.values()).find(
			(region) => region.key === key,
		);
	}

	getRegionById(id: string) {
		return this.regions.get(id);
	}

	upsertRegion(region: RegionCache) {
		this.regions.set(region.id, region);
	}

	removeRegion(id: string) {
		this.regions.delete(id);
	}
}
