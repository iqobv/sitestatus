'use client';

import { Pagination, Table } from '@/components/ui';
import { useTablePagination } from '@/hooks/useTablePagination.hook';
import { useTableSorting } from '@/hooks/useTableSorting.hook';
import { FullMonitor } from '@/types';
import { MonitorSortBy } from '@/types/monitors/monitorSortBy.types';
import { getCoreRowModel } from '@tanstack/react-table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useMonitorFilters } from '../useMonitorFilters.hook';
import styles from './MonitorsTable.module.scss';
import { MONITOR_COLUMNS } from './monitorsTableColumns';

dayjs.extend(relativeTime);

interface MonitorsTableProps {
	monitors: FullMonitor[];
	totalPages: number;
}

export const MonitorsTable = ({ monitors, totalPages }: MonitorsTableProps) => {
	const [{ sortBy, sortOrder, page, limit }, setFilters] = useMonitorFilters();

	const { pagination, handlePaginationChange } = useTablePagination({
		limit,
		page,
		setFilters,
		totalPages,
	});

	const { sorting, handleSortingChange } = useTableSorting<MonitorSortBy>({
		setFilters,
		sortBy,
		sortOrder,
	});

	return (
		<div className={styles.container}>
			<Table
				columns={MONITOR_COLUMNS}
				data={monitors}
				getCoreRowModel={getCoreRowModel()}
				state={{
					sorting,
					pagination,
				}}
				onSortingChange={handleSortingChange}
				onPaginationChange={handlePaginationChange}
				manualSorting
				manualPagination
				pageCount={totalPages}
			/>
			<Pagination
				currentPage={page + 1}
				totalPages={totalPages}
				onPageChange={(newPage) => setFilters({ page: newPage - 1 })}
			/>
		</div>
	);
};
