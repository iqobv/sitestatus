import { MONITOR_STATUSES } from '@/constants';
import { IMonitorWithPingResults } from '@/types';
import { calculateUptime, getP95 } from '@/utils';
import MonitorLastCheck from './MonitorLastCheck/MonitorLastCheck';
import MonitorStatusBreakdown from './MonitorStatusBreakdown/MonitorStatusBreakdown';

interface MonitorCardsItem {
	title: string;
	tooltip?: string;
	render: (monitor: IMonitorWithPingResults) => React.ReactNode;
}

export const MONITORS_CARDS_ITEMS: MonitorCardsItem[] = [
	{
		title: 'Overall Uptime',
		tooltip: 'The percentage of time the monitor was up',
		render: (monitor) => <>{calculateUptime(monitor.pingResults)}</>,
	},
	{
		title: 'Incidents',
		tooltip: 'The number of incidents where the monitor was not up',
		render: (monitor) => (
			<>
				{
					monitor.pingResults.filter(
						(ping) => ping.status !== MONITOR_STATUSES.UP
					).length
				}
			</>
		),
	},
	{
		title: 'Average Response Time (ms)',
		tooltip: 'The average response time of the monitor in milliseconds',
		render: (monitor) => (
			<>
				{monitor.pingResults.length
					? (
							monitor.pingResults.reduce(
								(acc, ping) => acc + (ping.responseTimeMs || 0),
								0
							) / monitor.pingResults.length
					  ).toFixed(0)
					: 'N/A'}
			</>
		),
	},
	{
		title: 'P95 Response Time (ms)',
		tooltip: 'The 95th percentile response time of the monitor in milliseconds',
		render: (monitor) => (
			<>{getP95(monitor.pingResults.map((ping) => ping.responseTimeMs || 0))}</>
		),
	},
	{
		title: 'Status Code Breakdown',
		tooltip: 'Breakdown of different status codes received',
		render: (monitor) => <MonitorStatusBreakdown monitor={monitor} />,
	},
	{
		title: 'Last Check',
		tooltip: 'The last time the monitor was checked',
		render: (monitor) => <MonitorLastCheck monitor={monitor} />,
	},
];
