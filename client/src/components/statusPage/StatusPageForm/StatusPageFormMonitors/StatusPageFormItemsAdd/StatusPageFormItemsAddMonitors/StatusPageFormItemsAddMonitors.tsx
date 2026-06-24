'use client';

import { getAllMonitors } from '@/api/monitor/getAllMonitors.api';
import { Button, Pagination } from '@/components/ui';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { PaginationQueryDto } from '@/dto/ui.dto';
import { useLocalPagination } from '@/hooks/useLocalPagination.hook';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { StatusPageFormItemsAddProps } from '../StatusPageFormItemsAdd';
import styles from '../StatusPageFormItemsAdd.module.scss';
import { StatusPageFormItemsAddMonitorsLoader } from './StatusPageFormItemsAddMonitorsLoader';

export const StatusPageFormItemsAddMonitors = ({
	fields,
	handleAddMonitors,
}: StatusPageFormItemsAddProps) => {
	const [{ page, limit }, setFilters] = useLocalPagination({
		page: 1,
		limit: 20,
	});

	const params: PaginationQueryDto = useMemo(
		() => ({ page, limit }),
		[page, limit],
	);

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.monitors.paginatedList(params),
		queryFn: () =>
			getAllMonitors({ ...params, sortBy: 'createdAt', sortOrder: 'desc' }),
	});

	if (isLoading) return <StatusPageFormItemsAddMonitorsLoader />;
	if (!data) return null;

	return (
		<div>
			<div className={styles.list}>
				{data.data.map((m) => {
					const alreadyAdded = fields.some((f) => f.id === m.id);

					return (
						<div key={m.id} className={styles.item}>
							<p>{m.name}</p>
							<Button
								onClick={() => !alreadyAdded && handleAddMonitors(m)}
								disabled={alreadyAdded}
							>
								Add
							</Button>
						</div>
					);
				})}
			</div>
			<Pagination
				currentPage={page + 1}
				totalPages={data?.meta?.totalPages || 0}
				onPageChange={(newPage) => setFilters({ page: newPage - 1 })}
			/>
		</div>
	);
};

export default StatusPageFormItemsAddMonitors;
