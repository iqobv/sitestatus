import { Button } from '@/components/ui';
import { PUBLIC_PAGES } from '@/config';
import { StatusPage } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { LuExternalLink } from 'react-icons/lu';
import { MdCopyAll } from 'react-icons/md';
import { toast } from 'react-toastify';
import { StatusPageDropdown } from '../../StatusPageDropdown/StatusPageDropdown';
import styles from './StatusPagesTable.module.scss';

export const STATUS_PAGES_COLUMNS: ColumnDef<StatusPage>[] = [
	{
		header: 'Title',
		accessorKey: 'title',
		enableSorting: true,
		meta: {
			style: { width: '60%' },
		},
	},
	{
		header: 'Slug',
		accessorKey: 'slug',
		enableSorting: true,
		meta: { disableLink: true, center: true },
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
				<span className={styles.status}>{status ? 'Published' : 'Draft'}</span>
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
];
