import { MonitorStatus } from './monitorStatus.types';

export interface MonitorTimeline {
	timestamp: Date;
	status: MonitorStatus;
}
