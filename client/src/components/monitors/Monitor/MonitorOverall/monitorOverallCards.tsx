import { MonitorCard, MonitorWithRegions } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MonitorOverallUptimeBar from './MonitorOverallUptimeBar/MonitorOverallUptimeBar';

dayjs.extend(relativeTime);

export const OVERALL_MONITOR_CARDS_ITEMS: MonitorCard<MonitorWithRegions>[] = [
	{
		title: 'Last Status',
		render: (monitor) => <>{monitor.lastStatus}</>,
	},
	{
		title: 'Last check at',
		render: (monitor) => (
			<>
				{monitor.lastCheckedAt
					? dayjs(monitor.lastCheckedAt).fromNow()
					: 'Never'}
			</>
		),
	},
	{
		title: 'Uptime Last 24H',
		render: (monitor) => (
			<MonitorOverallUptimeBar timeline={monitor.timeline} />
		),
	},
];
