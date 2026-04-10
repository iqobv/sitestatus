import { MONITOR_STATUSES } from '@/constants';
import { MonitorAnalytics } from '@/types';
import { calculateUptime } from '@/utils';
import MonitorLastCheck from './MonitorLastCheck/MonitorLastCheck';

interface MonitorCardsItem {
	title: string;
	tooltip?: string;
	render: (monitor: MonitorAnalytics) => React.ReactNode;
}

export const MONITORS_CARDS_ITEMS: MonitorCardsItem[] = [
	{
		title: 'Overall Uptime',
		tooltip: 'The percentage of time the monitor was up',
		render: (monitor) => <>{calculateUptime(monitor.data)}</>,
	},
	{
		title: 'Incidents',
		tooltip: 'The number of incidents where the monitor was not up',
		render: (monitor) => (
			<>
				{
					monitor.data.filter((stat) => stat.status !== MONITOR_STATUSES.UP)
						.length
				}
			</>
		),
	},
	// {
	// 	title: 'Average Response Time (ms)',
	// 	tooltip: 'The average response time of the monitor in milliseconds',
	// 	render: (monitor) => (
	// 		<>
	// 			{monitor.data.length
	// 				? (
	// 						monitor.data.reduce(
	// 							(acc, stat) => acc + (stat.avgResponseMs || 0),
	// 							0,
	// 						) / monitor.data.length
	// 					).toFixed(0)
	// 				: 'N/A'}
	// 		</>
	// 	),
	// },
	// {
	// 	title: 'P95 Response Time (ms)',
	// 	tooltip: 'The 95th percentile response time of the monitor in milliseconds',
	// 	render: (monitor) => (
	// 		<>{getP95(monitor.data.map((stat) => stat.avgResponseMs || 0))}</>
	// 	),
	// },
	// {
	// 	title: 'Status Code Breakdown',
	// 	tooltip: 'Breakdown of different status codes received',
	// 	render: (monitor) => <MonitorStatusBreakdown monitor={monitor} />,
	// },
	{
		title: 'Last Check',
		tooltip: 'The last time the monitor was checked',
		render: (monitor) => <MonitorLastCheck monitor={monitor} />,
	},
];
