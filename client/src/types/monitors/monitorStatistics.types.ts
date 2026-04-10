export interface MonitorStatistics {
	p95: number;
	uptime: string;
	errorRate: string;
	responseTime: {
		min: number;
		max: number;
		avg: number;
	};
}
