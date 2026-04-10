import { MonitorMainInfo } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MonitorOverallUptimeBar from './MonitorOverallUptimeBar/MonitorOverallUptimeBar';

dayjs.extend(relativeTime);

interface MonitorOverallCardsItem {
	title: string;
	tooltip?: string;
	render: (monitor: MonitorMainInfo) => React.ReactNode;
}

export const OVERALL_MONITOR_CARDS_ITEMS: MonitorOverallCardsItem[] = [
	{
		title: 'Last Status',
		render: (monitor) => <>{monitor.lastStatus}</>,
	},
	{
		title: 'Last check at',
		render: (monitor) => <>{dayjs(monitor.lastCheckedAt).fromNow()}</>,
	},
	{
		title: 'Uptime Last 24H',
		render: (monitor) => (
			<MonitorOverallUptimeBar timeline={monitor.timeline} />
		),
	},
];
