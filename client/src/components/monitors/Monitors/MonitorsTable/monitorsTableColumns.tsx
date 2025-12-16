import { Button, UptimeStatus } from '@/components/ui';
import { PAGES } from '@/config';
import { IMonitor, IMonitorWithPingResults } from '@/types';
import { calculateUptime } from '@/utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Column {
	header: string;
	accessor: keyof IMonitor | 'details' | 'uptime';
	render: (monitor: IMonitorWithPingResults) => React.ReactNode;
}

export const COLUMNS: Column[] = [
	{
		header: 'Name',
		accessor: 'name',
		render: (monitor) => <>{monitor.name}</>,
	},
	{
		header: 'Status',
		accessor: 'lastStatus',
		render: (monitor) => <UptimeStatus status={monitor.lastStatus} />,
	},
	{
		header: 'Uptime',
		accessor: 'uptime',
		render: (monitor) => <>{calculateUptime(monitor.pingResults)}</>,
	},
	{
		header: 'Last Checked',
		accessor: 'lastCheckedAt',
		render: (monitor) => <>{dayjs(monitor.lastCheckedAt).fromNow()}</>,
	},
	{
		header: '',
		accessor: 'details',
		render: (monitor) => (
			<Button variant="link" size="sm" href={PAGES.MONITOR(monitor.id)}>
				View Details
			</Button>
		),
	},
];
