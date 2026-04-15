import { MonitorStatus } from './monitorStatus.types';
import { StatPeriod } from './statPeriod.types';

export interface MonitorStat {
	id: string;
	monitorId: string;
	regionId: string;
	status: MonitorStatus;
	avgResponseMs: number;
	uptimePercent: number;
	timestamp: Date;
	period: StatPeriod;
}
