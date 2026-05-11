export interface MonitorCache {
	id: string;
	url: string;
	method: string;
	checkIntervalSeconds: number;
	nextCheckAt: number;
	regionIds: string[];
}

export interface RegionCache {
	id: string;
	name: string;
	key: string;
}

export type MonitorCachePayload = Omit<MonitorCache, 'nextCheckAt'>;

export interface MonitorUpdatePayload extends MonitorCachePayload {
	isActive: boolean;
	isNew?: boolean;
}

export interface RegionCachePayload extends RegionCache {
	isActive: boolean;
}
