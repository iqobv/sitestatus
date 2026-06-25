'use client';

import { getUserStatusPages } from '@/api/statusPage/getUserStatusPages.api';
import { Pagination, Table } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useTablePagination } from '@/hooks/useTablePagination.hook';
import { useTableSorting } from '@/hooks/useTableSorting.hook';
import { statusPagesQuerySchema } from '@/schemas/statusPage/statusPagesQuery.schema';
import { StatusPage } from '@/types/statusPage/statusPage.types';
import { useQuery } from '@tanstack/react-query';
import { getCoreRowModel } from '@tanstack/react-table';
import { useStatusPagesFilters } from '../useStatusPagesFilters.hook';
import styles from './StatusPagesTable.module.scss';
import { StatusPagesTableLoader } from './StatusPagesTableLoader';
import { STATUS_PAGES_COLUMNS } from './statusPagesColumns';

export const StatusPagesTable = () => {
	const [filters, setFilters] = useStatusPagesFilters();

	const { page, limit, sortBy, sortOrder } = filters;

	const parsedFilters = statusPagesQuerySchema.parse(filters);

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.statusPages.list(parsedFilters),
		queryFn: () => getUserStatusPages(parsedFilters),
	});

	const { pagination, handlePaginationChange } = useTablePagination({
		page,
		limit,
		setFilters,
		totalPages: data?.meta.totalPages || 0,
	});

	const { sorting, handleSortingChange } = useTableSorting({
		sortBy,
		sortOrder,
		setFilters,
	});

	if (isLoading) return <StatusPagesTableLoader />;
	if (!data || data.meta.total === 0)
		return (
			<div className={styles.statusPagesTable}>No status pages found.</div>
		);

	return (
		<>
			<Table<StatusPage>
				data={data.data}
				getRowHref={(row) => PRIVATE_PAGES.STATUS_PAGES.ID(row.id)}
				columns={STATUS_PAGES_COLUMNS}
				manualSorting
				manualPagination
				pageCount={data.meta.totalPages}
				state={{
					sorting,
					pagination,
				}}
				onSortingChange={handleSortingChange}
				onPaginationChange={handlePaginationChange}
				getCoreRowModel={getCoreRowModel()}
			/>
			<Pagination
				currentPage={page + 1}
				onPageChange={(newPage) => setFilters({ page: newPage - 1 })}
				totalPages={data.meta.totalPages}
			/>
		</>
	);
};
