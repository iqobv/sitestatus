import { MonitorStatus } from '../monitors/monitorStatus.types';

export interface HeatmapCell {
	from: Date;
	to: Date;
	status: MonitorStatus | null;
	avgResponse: number | null;
}
