import { DefaultFields } from '../defaultFields.types';
import { BaseMonitor } from '../monitors/monitor.types';

export interface StatusPageMonitor extends DefaultFields {
	displayName: string | null;
	sortOrder: number;
	statusPageId: string;
	monitorId: string;
}

export interface FullStatusPageMonitor extends StatusPageMonitor {
	monitor: BaseMonitor;
}
