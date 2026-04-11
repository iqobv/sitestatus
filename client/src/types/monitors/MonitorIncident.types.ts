export interface MonitorIncident {
	id: string;
	monitorId: string;
	regionId: string;
	statusCode: number | null;
	createdAt: Date;
	errorMessage: string | null;
	resolved: boolean;
	resolvedAt: Date | null;
	alertTriggered: boolean;
	alertSentAt: Date | null;
}
