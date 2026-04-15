import { DefaultFields } from '../defaultFields.types';
import { BaseRegion } from '../region';
import { MonitorStat } from './monitorStat.types';
import { MonitorStatus } from './monitorStatus.types';
import { MonitorTimeline } from './monitoTimeline.types';

export interface Monitor extends DefaultFields {
	projectId: string | null;
	name: string;
	url: string;
	checkIntervalSeconds: number;
	lastCheckedAt: Date;
	lastStatus: MonitorStatus;
	isActive: boolean;
}

export interface MonitorFull extends Monitor {
	regions: BaseRegion[];
	uptime: string;
	timeline: MonitorTimeline[];
}

export interface MonitorWithMonitorStats extends Monitor {
	uptime: string;
	monitorStats: MonitorStat[];
}

export interface MonitorWithRegions extends Monitor {
	regions: string[];
}
