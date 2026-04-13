import { BaseRegion } from '../region';
import { MonitorStatus } from './monitorStatus.types';

export interface AnalyticsRawData {
	status: MonitorStatus;
	responseTimeMs: number;
	errorMessage: string | null;
	createdAt: Date;
	region: BaseRegion;
}
