import { MonitorStatus } from '../monitors/monitorStatus.types';
import { MonitorTimeline } from '../monitors/monitoTimeline.types';

export interface PublicStatusPage {
	id: string;
	slug: string;
	title: string;
	description: string | null;
}

export interface PublicStatusPageMonitor {
	id: string;
	displayName: string;
	sortOrder: number;
	monitorId: string;
	lastStatus: MonitorStatus;
	uptime: string;
	timeline: MonitorTimeline[];
}
