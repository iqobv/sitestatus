'use client';

import { getAllRegions } from '@/api';
import { Button, Table } from '@/components/ui';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { useTransformSecondsToHours } from '@/hooks';
import { Incident } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { getCoreRowModel } from '@tanstack/react-table';
import MonitorIncidentsLoader from '../MonitorIncidentsLoader';
import MonitorIncidentStatus from '../MonitorIncidentStatus/MonitorIncidentStatus';
import styles from './MonitorIncidentsTable.module.scss';

interface MonitorIncidentsTableProps {
	incidents: Incident[];
}

const MonitorIncidentsTable = ({ incidents }: MonitorIncidentsTableProps) => {
	const { data: regions, isLoading } = useQuery({
		queryKey: QUERY_KEYS.region.list,
		queryFn: getAllRegions,
	});

	if (isLoading) return <MonitorIncidentsLoader />;

	return (
		<Table<Incident>
			data={incidents}
			getCoreRowModel={getCoreRowModel()}
			columns={[
				{
					header: 'Status',
					accessorKey: 'status',
					enableSorting: false,
					cell: ({ row }) => {
						const data = row.original;

						return <MonitorIncidentStatus isResolved={data.resolved} />;
					},
				},
				{
					header: 'Status Code',
					accessorKey: 'error',
					enableSorting: false,
					cell: ({ row }) => {
						const data = row.original;
						return (
							<div className={styles.errorInfo}>
								<p>{data.statusCode}</p>
								<p>{data.errorMessage ?? 'No error message available'}</p>
							</div>
						);
					},
				},
				{
					header: 'Created At',
					accessorKey: 'createdAt',
					enableSorting: false,
					cell: ({ row }) => {
						const data = row.original;
						return <>{new Date(data.createdAt).toLocaleString()}</>;
					},
				},
				{
					header: 'Duration',
					accessorKey: 'duration',
					enableSorting: false,
					cell: ({ row }) => {
						const data = row.original;

						if (!data.resolved && !data.resolvedAt) return '-';

						const duration =
							new Date(data.resolvedAt!).getTime() -
							new Date(data.createdAt).getTime();

						return <>{useTransformSecondsToHours(duration / 1000)}</>;
					},
				},
				{
					header: 'Region',
					accessorKey: 'region',
					enableSorting: false,
					cell: ({ row }) => {
						const data = row.original;
						const region = regions
							? regions.find((r) => r.id === data.regionId)
							: null;
						if (!region) return 'Unknown region';
						return <>{region.name}</>;
					},
				},
				{
					header: 'Actions',
					accessorKey: 'actions',
					enableSorting: false,
					meta: {
						className: styles.actions,
						style: { textAlign: 'center' },
						center: true,
					},
					cell: ({ row }) => {
						const data = row.original;
						return (
							<Button
								href={PRIVATE_PAGES.MONITORS.INCIDENT(data.monitorId, data.id)}
								fullWidth
								variant="link"
							>
								View Details
							</Button>
						);
					},
				},
			]}
		/>
	);
};

export default MonitorIncidentsTable;
