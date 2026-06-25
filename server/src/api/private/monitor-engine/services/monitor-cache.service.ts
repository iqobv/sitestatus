import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import {
	MonitorCache,
	MonitorCachePayload,
	RegionCache,
} from '../interfaces/cache-storage.interface';

@Injectable()
export class MonitorCacheService implements OnModuleInit {
	private readonly monitors: Map<string, MonitorCache> = new Map();
	private readonly regions: Map<string, RegionCache> = new Map();

	constructor(
		private readonly prismaService: PgPrismaService,
		private readonly tursoPrismaService: TursoPrismaService,
	) {}

	public async onModuleInit(): Promise<void> {
		await Promise.all([this.loadRegions(), this.loadMonitors()]);
	}

	private async loadRegions(): Promise<void> {
		const dbRegions = await this.prismaService.region.findMany({
			where: { isActive: true },
			select: { id: true, key: true, name: true },
		});

		dbRegions.forEach((region) => {
			this.regions.set(region.id, region);
		});
	}

	private async loadMonitors(): Promise<void> {
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

	public getMonitors(): MonitorCache[] {
		return Array.from(this.monitors.values());
	}

	public upsertMonitor(
		data: MonitorCachePayload,
		isNew: boolean = false,
	): void {
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

	public updateMonitorNextCheck(id: string, nextCheckAt: number): void {
		const monitor = this.monitors.get(id);
		if (monitor) {
			this.monitors.set(id, { ...monitor, nextCheckAt });
		}
	}

	public removeMonitor(id: string): void {
		this.monitors.delete(id);
	}

	public getRegions(): RegionCache[] {
		return Array.from(this.regions.values());
	}

	public getRegionByKey(key: string): RegionCache | undefined {
		return Array.from(this.regions.values()).find(
			(region) => region.key === key,
		);
	}

	public getRegionById(id: string): RegionCache | undefined {
		return this.regions.get(id);
	}

	public upsertRegion(region: RegionCache): void {
		this.regions.set(region.id, region);
	}

	public removeRegion(id: string): void {
		this.regions.delete(id);
	}
}
