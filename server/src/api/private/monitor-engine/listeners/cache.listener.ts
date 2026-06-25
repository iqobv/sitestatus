import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CACHE_EMIT_EVENTS } from '../constants/emit-events.constants';
import type {
	MonitorUpdatePayload,
	RegionCachePayload,
} from '../interfaces/cache-storage.interface';
import { MonitorCacheService } from '../services/monitor-cache.service';

@Injectable()
export class CacheListener {
	constructor(
		private readonly cacheService: MonitorCacheService,
		private readonly tursoPrismaService: TursoPrismaService,
	) {}

	@OnEvent(CACHE_EMIT_EVENTS.MONITOR.UPDATED)
	public handleMonitorUpdated(payload: MonitorUpdatePayload): void {
		const { isActive, isNew = false, ...cacheData } = payload;

		if (isActive) {
			this.cacheService.upsertMonitor(cacheData, isNew);
		} else {
			this.cacheService.removeMonitor(payload.id);
		}
	}

	@OnEvent(CACHE_EMIT_EVENTS.MONITOR.DELETED)
	public async handleMonitorDeleted(id: string): Promise<void> {
		this.cacheService.removeMonitor(id);

		try {
			await this.tursoPrismaService.monitorState.delete({
				where: { monitorId: id },
			});
		} catch {
			return;
		}
	}

	@OnEvent(CACHE_EMIT_EVENTS.REGION.UPDATED)
	public handleRegionUpdated(region: RegionCachePayload): void {
		if (region.isActive) {
			this.cacheService.upsertRegion({
				id: region.id,
				key: region.key,
				name: region.name,
			});
		} else {
			this.cacheService.removeRegion(region.id);
		}
	}

	@OnEvent(CACHE_EMIT_EVENTS.REGION.DELETED)
	public handleRegionDeleted(id: string): void {
		this.cacheService.removeRegion(id);
	}
}
