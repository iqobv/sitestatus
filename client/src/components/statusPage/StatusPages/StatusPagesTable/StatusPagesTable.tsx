'use client';

import { getUserStatusPages } from '@/api';
import { Table } from '@/components/ui';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { StatusPage } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { getCoreRowModel } from '@tanstack/react-table';
import styles from './StatusPagesTable.module.scss';
import { StatusPagesTableLoader } from './StatusPagesTableLoader';
import { STATUS_PAGES_COLUMNS } from './statusPagesColumns';

export const StatusPagesTable = () => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.statusPages.lists(),
		queryFn: getUserStatusPages,
	});

	if (isLoading) return <StatusPagesTableLoader />;
	if (!data)
		return (
			<div className={styles.statusPagesTable}>No status pages found.</div>
		);

	return (
		<Table<StatusPage>
			data={data}
			getRowHref={(row) => PRIVATE_PAGES.STATUS_PAGES.ID(row.id)}
			columns={STATUS_PAGES_COLUMNS}
			getCoreRowModel={getCoreRowModel()}
		/>
	);
};
