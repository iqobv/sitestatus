'use client';

import { getUserStatusPages } from '@/api';
import { Button, Table } from '@/components/ui';
import { PRIVATE_PAGES, PUBLIC_PAGES, QUERY_KEYS } from '@/config';
import { StatusPage } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { getCoreRowModel } from '@tanstack/react-table';
import { LuExternalLink } from 'react-icons/lu';
import { MdCopyAll } from 'react-icons/md';
import { toast } from 'react-toastify';
import { StatusPageDropdown } from '../../StatusPageDropdown';
import styles from './StatusPagesTable.module.scss';
import StatusPagesTableLoader from './StatusPagesTableLoader';

const StatusPagesTable = () => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.statusPage.all,
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
			columns={[
				{
					header: 'Title',
					accessorKey: 'title',
					enableSorting: false,
					meta: {
						style: { width: '99%' },
					},
				},
				{
					header: 'Slug',
					accessorKey: 'slug',
					enableSorting: false,
					meta: { disableLink: true },
					cell: ({ row }) => {
						const slug = row.original.slug;

						const handleCopy = async () => {
							try {
								const url = `${process.env.NEXT_PUBLIC_STATUS_PAGE_URL}/${slug}`;
								await navigator.clipboard.writeText(url);
								toast.success('Status page URL copied to clipboard!');
							} catch (err) {
								console.error('Failed to copy: ', err);
							}
						};

						return (
							<span className={styles.slug}>
								{row.original.slug}
								<Button size="sm" variant="text" isIcon onClick={handleCopy}>
									<MdCopyAll />
								</Button>
							</span>
						);
					},
				},
				{
					header: 'Status',
					accessorKey: 'status',
					enableSorting: false,
					meta: { center: true, disableLink: true },
					cell: ({ row }) => {
						const status = row.original.isPublished;
						return (
							<span className={styles.status}>
								{status ? 'Published' : 'Draft'}
							</span>
						);
					},
				},
				{
					header: 'Actions',
					accessorKey: 'actions',
					meta: { center: true, disableLink: true },
					cell: ({ row }) => (
						<div className={styles.actions}>
							<Button
								variant="outlined"
								isIcon
								size="sm"
								href={PUBLIC_PAGES.STATUS_PAGE(row.original.slug)}
								target="_blank"
								rel="noopener noreferrer"
							>
								<LuExternalLink size={20} />
							</Button>
							<StatusPageDropdown statusPage={row.original} />
						</div>
					),
					enableSorting: false,
				},
			]}
			getCoreRowModel={getCoreRowModel()}
		/>
	);
};

export default StatusPagesTable;
