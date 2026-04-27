import { TursoPrismaService } from '@infra/prisma/turso-prisma.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CACHE_EMIT_EVENTS } from '../constants';
import type { MonitorUpdatePayload, RegionCachePayload } from '../interfaces';
import { MonitorCacheService } from '../services/monitor-cache.service';

@Injectable()
export class CacheListener {
	constructor(
		private readonly cacheService: MonitorCacheService,
		private readonly tursoPrismaService: TursoPrismaService,
	) {}

	@OnEvent(CACHE_EMIT_EVENTS.MONITOR.UPDATED)
	handleMonitorUpdated(payload: MonitorUpdatePayload) {
		const { isActive, isNew = false, ...cacheData } = payload;

		if (isActive) {
			this.cacheService.upsertMonitor(cacheData, isNew);
		} else {
			this.cacheService.removeMonitor(payload.id);
		}
	}

	@OnEvent(CACHE_EMIT_EVENTS.MONITOR.DELETED)
	async handleMonitorDeleted(id: string) {
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
	handleRegionUpdated(region: RegionCachePayload) {
		if (region.isActive) {
			this.cacheService.upsertRegion({ id: region.id, key: region.key });
		} else {
			this.cacheService.removeRegion(region.id);
		}
	}

	@OnEvent(CACHE_EMIT_EVENTS.REGION.DELETED)
	handleRegionDeleted(id: string) {
		this.cacheService.removeRegion(id);
	}
}
