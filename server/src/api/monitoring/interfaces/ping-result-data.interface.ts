import { SiteStatus } from 'generated/prisma/enums';

export interface PingResultData {
	status: SiteStatus;
	statusCode?: number | null;
	responseTimeMs?: number;
	error?: string | null;
}
