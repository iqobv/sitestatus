import { TMonitorStatus } from './monitorStatus.types';

export interface IPingResult {
	id: string;
	monitorId: string;
	status: TMonitorStatus;
	statusCode: number | null;
	responseTimeMs: number | null;
	errorMessage: string | null;
	checkedAt: Date;
	createdAt: Date;
	updatedAt: Date;
}
