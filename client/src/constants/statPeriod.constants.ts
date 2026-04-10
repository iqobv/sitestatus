export const STAT_PERIOD = {
	HOURLY: 'HOURLY',
	DAILY: 'DAILY',
	WEEKLY: 'WEEKLY',
	MONTHLY: 'MONTHLY',
} as const;

export const ANALYTICS_STAT_PERIOD = {
	...STAT_PERIOD,
	RAW: 'RAW',
} as const;
