import { SiteStatus } from '@generated/engine/enums';

export interface LogEntry {
	status: SiteStatus;
	responseTimeMs: number;
	createdAt: Date;
}
