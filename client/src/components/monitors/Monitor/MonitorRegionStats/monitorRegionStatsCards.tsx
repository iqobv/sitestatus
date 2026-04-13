import { MonitorAnalytics, MonitorCard } from '@/types';

export const MONITOR_REGIONS_STATS_CARDS: MonitorCard<MonitorAnalytics>[] = [
	{
		title: 'Uptime Percentage',
		render: (data) => <>{data.statistics.uptime}</>,
	},
	{
		title: 'Error Rate',
		render: (data) => <>{data.statistics.errorRate}</>,
	},
	{
		title: 'P95 Response Time',
		tooltip: '95th percentile response time',
		render: (data) => <>{`${data.statistics.p95} ms`}</>,
	},
];
