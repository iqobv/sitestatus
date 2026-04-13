import { BaseRegion } from '../region';
import { MonitorStat } from './monitorStat.types';
import { MonitorStatus } from './monitorStatus.types';
import { MonitorTimeline } from './monitoTimeline.types';

export interface Monitor {
	id: string;
	projectId: string | null;
	name: string;
	url: string;
	checkIntervalSeconds: number;
	lastCheckedAt: Date;
	lastStatus: MonitorStatus;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface MonitorMainInfo extends Monitor {
	regions: BaseRegion[];
	uptime: string;
	timeline: MonitorTimeline[];
}

export interface MonitorWithMonitorStats extends Monitor {
	uptime: string;
	monitorStats: MonitorStat[];
}
