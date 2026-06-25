export const StatPeriod = {
	HOURLY: 'HOURLY',
	DAILY: 'DAILY',
	WEEKLY: 'WEEKLY',
	MONTHLY: 'MONTHLY',
} as const;

export const AnalyticsStatPeriod = {
	...StatPeriod,
	RAW: 'RAW',
} as const;

export type StatPeriod = (typeof StatPeriod)[keyof typeof StatPeriod];
export type AnalyticsStatPeriod =
	(typeof AnalyticsStatPeriod)[keyof typeof AnalyticsStatPeriod];
