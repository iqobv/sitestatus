'use client';

import { Table } from '@/components/ui';
import { useTablePagination } from '@/hooks/useTablePagination.hook';
import { useTableSorting } from '@/hooks/useTableSorting.hook';
import { Project } from '@/types';
import { getCoreRowModel } from '@tanstack/react-table';
import { useProjectFilters } from '../useProjectFilters.hook';
import { PROJECTS_TABLE_COLUMNS } from './projectsTableColumns';

interface ProjectsTableProps {
	projects: Project[];
	totalPages: number;
}

export const ProjectsTable = ({ projects, totalPages }: ProjectsTableProps) => {
	const [{ sortBy, sortOrder, page, limit }, setFilters] = useProjectFilters();

	const { pagination, handlePaginationChange } = useTablePagination({
		limit,
		page,
		setFilters,
		totalPages,
	});

	const { sorting, handleSortingChange } = useTableSorting({
		setFilters,
		sortBy,
		sortOrder,
	});

	return (
		<Table
			columns={PROJECTS_TABLE_COLUMNS}
			data={projects}
			manualPagination
			manualSorting
			state={{
				pagination,
				sorting,
			}}
			onPaginationChange={handlePaginationChange}
			onSortingChange={handleSortingChange}
			pageCount={totalPages}
			getCoreRowModel={getCoreRowModel()}
		/>
	);
};
