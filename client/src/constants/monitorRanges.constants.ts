export const MONITOR_RANGES = {
	'24h': '24h',
	'7d': '7d',
	'30d': '30d',
} as const;

export const RANGE_TO_URL_MAP: Record<number, string> = {
	1: '24h',
	7: '7d',
	30: '30d',
} as const;

export const URL_TO_RANGE_MAP: Record<string, number> = {
	'24h': 1,
	'7d': 7,
	'30d': 30,
} as const;
