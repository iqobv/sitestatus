export const MonitorRange = {
	'24h': '24h',
	'7d': '7d',
	'30d': '30d',
} as const;

export type MonitorRange = (typeof MonitorRange)[keyof typeof MonitorRange];

export type RangeNumericValue = 1 | 7 | 30;
