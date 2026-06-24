import { Button } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { Project } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const PROJECTS_TABLE_COLUMNS: ColumnDef<Project>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		enableSorting: true,
		meta: {
			style: {
				width: '90%',
			},
		},
		cell: (props) => <>{props.getValue()}</>,
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		enableSorting: false,
		meta: {
			center: true,
		},
		cell: (props) => {
			const projectId = props.row.original.id;

			return (
				<Button
					size="sm"
					variant="link"
					href={PRIVATE_PAGES.PROJECTS.ID(projectId)}
				>
					View
				</Button>
			);
		},
	},
];
