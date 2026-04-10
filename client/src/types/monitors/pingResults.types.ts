import { MonitorStatus } from './monitorStatus.types';

export interface PingResult {
	id: string;
	monitorId: string;
	status: MonitorStatus;
	statusCode: number | null;
	responseTimeMs: number | null;
	errorMessage: string | null;
	checkedAt: Date;
	createdAt: Date;
	updatedAt: Date;
}
