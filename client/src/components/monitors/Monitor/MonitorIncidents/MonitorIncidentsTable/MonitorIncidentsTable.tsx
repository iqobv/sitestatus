'use client';

import { Table } from '@/components/ui';
import { useTransformSecondsToHours } from '@/hooks';
import { MonitorIncident } from '@/types';
import { getCoreRowModel } from '@tanstack/react-table';
import MonitorIncidentStatus from '../MonitorIncidentStatus/MonitorIncidentStatus';
import styles from './MonitorIncidentsTable.module.scss';

interface MonitorIncidentsTableProps {
	incidents: MonitorIncident[];
}

const MonitorIncidentsTable = ({ incidents }: MonitorIncidentsTableProps) => {
	return (
		<div className={styles['monitor-incidents-table']}>
			<Table<MonitorIncident>
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
								<div className={styles['monitor-incidents-table__error-info']}>
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
				]}
			/>
		</div>
	);
};

export default MonitorIncidentsTable;
