import { MONITOR_STATUSES } from '@/constants';

export type MonitorStatus =
	(typeof MONITOR_STATUSES)[keyof typeof MONITOR_STATUSES];
