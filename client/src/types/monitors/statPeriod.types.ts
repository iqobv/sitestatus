import { ANALYTICS_STAT_PERIOD, STAT_PERIOD } from '@/constants';

export type StatPeriod = (typeof STAT_PERIOD)[keyof typeof STAT_PERIOD];
export type AnalyticsStatPeriod =
	(typeof ANALYTICS_STAT_PERIOD)[keyof typeof ANALYTICS_STAT_PERIOD];
