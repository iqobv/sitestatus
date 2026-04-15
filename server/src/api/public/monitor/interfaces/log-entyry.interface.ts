import { SiteStatus } from 'generated/prisma/enums';

export interface LogEntry {
	status: SiteStatus;
	responseTimeMs: number;
	createdAt: Date;
}
