import { MonitorStatus } from '@/types';

export interface Incident {
	startTime: Date;
	endTime: Date | null;
	durationMs: number | null;
	status: MonitorStatus;
}
