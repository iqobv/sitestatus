import { DefaultFields } from '../defaultFields.types';

export interface Incident extends DefaultFields {
	monitorId: string;
	regionId: string;
	triggerLogId: string;
	errorMessage: string | null;
	statusCode: number | null;
	resolved: boolean;
	resolvedAt: Date | null;
	alertTriggered: boolean;
	alertSentAt: Date | null;
}
