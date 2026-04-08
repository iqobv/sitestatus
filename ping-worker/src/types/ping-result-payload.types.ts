import { SiteStatus } from './site-status.types.js';

export interface PingResultPayload {
	monitorId: string;
	status: SiteStatus;
	statusCode: number | null;
	responseTimeMs: number;
	errorMessage: string | null;
}
