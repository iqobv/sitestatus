import { StatusPageMonitorUpdateInput } from '@generated/postgres/models';

export interface MonitorUpdatePayload {
	id: string;
	data: StatusPageMonitorUpdateInput;
}
