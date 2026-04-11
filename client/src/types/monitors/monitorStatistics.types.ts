import { MonitorResponseStatistics } from './monitorResponseStatistics.types';

export interface MonitorStatistics {
	p95: number;
	uptime: string;
	errorRate: string;
	responseTime: MonitorResponseStatistics;
}
