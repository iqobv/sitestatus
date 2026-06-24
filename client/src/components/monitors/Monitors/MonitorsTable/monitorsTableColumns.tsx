import { Button, UptimeStatus } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { FullMonitor } from '@/types/monitors/monitor.types';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const MONITOR_COLUMNS: ColumnDef<FullMonitor>[] = [
	{
		header: 'Name',
		accessorKey: 'name',
		enableSorting: true,
		meta: {
			style: { width: '60%' },
		},
		cell: (props) => <>{props.getValue()}</>,
	},
	{
		header: 'Status',
		accessorKey: 'lastStatus',
		enableSorting: false,
		cell: (props) => (
			<UptimeStatus
				status={
					props.row.original.isActive ? props.row.original.lastStatus : 'PAUSED'
				}
			/>
		),
	},
	{
		header: 'Uptime',
		accessorKey: 'uptime',
		enableSorting: false,
		cell: (props) => <>{props.getValue()}</>,
	},
	{
		header: 'Last Checked',
		accessorKey: 'lastCheckedAt',
		enableSorting: false,
		cell: (props) => {
			const lastCheckedAt = props.row.original.lastCheckedAt;

			return <> {lastCheckedAt ? dayjs(lastCheckedAt).fromNow() : 'Never'}</>;
		},
	},
	{
		header: '',
		accessorKey: 'details',
		enableSorting: false,
		cell: (props) => (
			<Button
				variant="link"
				size="sm"
				href={PRIVATE_PAGES.MONITORS.ONE(props.row.original.id)}
			>
				View Details
			</Button>
		),
	},
];
