import { MonitorStatus } from './monitorStatus.types';

export interface MonitorTimeline {
	timestamp: Date;
	uptime: string;
	status: MonitorStatus;
}
