import { TMonitorStatus } from '../monitors/monitorStatus.types';

export interface IHeatmapCell {
	from: Date;
	to: Date;
	status: TMonitorStatus | null;
	avgResponse: number | null;
}
