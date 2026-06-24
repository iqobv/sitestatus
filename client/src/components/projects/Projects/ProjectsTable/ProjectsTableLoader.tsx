'use client';

import { TableLoader } from '@/components/ui';
import { PROJECTS_TABLE_COLUMNS } from './projectsTableColumns';

export const ProjectsTableLoader = () => {
	return <TableLoader columns={PROJECTS_TABLE_COLUMNS} countRows={10} />;
};
