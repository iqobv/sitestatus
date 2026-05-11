import { DefaultFields } from '../defaultFields.types';
import { BaseRegion } from '../region';
import { MonitorStatus } from './monitorStatus.types';
import { MonitorTimeline } from './monitoTimeline.types';

export interface BaseMonitor extends DefaultFields {
	projectId: string | null;
	name: string;
	url: string;
	method: string;
	checkIntervalSeconds: number;
	isActive: boolean;
}

export interface FullMonitor extends BaseMonitor {
	lastCheckedAt: Date;
	lastStatus: MonitorStatus;
}

export interface MonitorWithTimeline extends FullMonitor {
	uptime: string;
	timeline: MonitorTimeline[];
}

export interface MonitorWithRegions extends MonitorWithTimeline {
	regions: BaseRegion[];
}

export interface MonitorWithRegionsIds extends FullMonitor {
	regions: string[];
}
