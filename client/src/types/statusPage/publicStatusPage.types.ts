import { MonitorStatus, MonitorTimeline } from '../monitors';

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
