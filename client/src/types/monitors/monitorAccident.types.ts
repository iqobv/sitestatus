export interface MonitorAccident {
	id: string;
	monitorId: string;
	regionId: string;
	statusCode: number | null;
	createdAt: Date;
	errorMessage: string | null;
	resolved: true;
	resolvedAt: Date | null;
	alertsTriggered: true;
	alertSentAt: Date | null;
}
