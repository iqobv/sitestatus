import { MONITOR_RANGES } from '@/constants';

export type MonitorRange = (typeof MONITOR_RANGES)[keyof typeof MONITOR_RANGES];

export type RangeNumericValue = 1 | 7 | 30;
