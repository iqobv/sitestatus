import { SiteStatus } from '@generated/turso/enums';

export interface LogEntry {
	status: SiteStatus;
	responseTimeMs: number;
	createdAt: Date;
}
