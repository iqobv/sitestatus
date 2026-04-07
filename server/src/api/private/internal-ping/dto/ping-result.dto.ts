import { SiteStatus } from 'generated/prisma/enums';

export class PingResultDto {
	monitorId: string;
	status: SiteStatus;
	statusCode: number | null;
	responseTimeMs: number;
	errorMessage: string | null;
	region: string;
}
