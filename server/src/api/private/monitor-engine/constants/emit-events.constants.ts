export const CACHE_EMIT_EVENTS = {
	MONITOR: {
		UPDATED: 'monitor.updated',
		DELETED: 'monitor.deleted',
	} as const,
	REGION: {
		UPDATED: 'region.updated',
		DELETED: 'region.deleted',
	} as const,
} as const;
