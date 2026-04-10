import { MonitorStatus } from './monitorStatus.types';

export interface AnalyticsStatData {
	uptimePercent: number;
	avgResponseMs: number;
	timestamp: Date;
	regionId: string;
	status: MonitorStatus;
}
