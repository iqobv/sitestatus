'use client';

import { getAllProjects } from '@/api/project/getAllProjects.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { projectsQuerySchema } from '@/schemas/project/projectsQuery.schema';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { EmptyProjects } from './EmptyProjects/EmptyProjects';
import { ProjectsTable } from './ProjectsTable/ProjectsTable';
import { ProjectsTableLoader } from './ProjectsTable/ProjectsTableLoader';
import { useProjectFilters } from './useProjectFilters.hook';

export const Projects = () => {
	const [filters] = useProjectFilters();

	const validatedParams = useMemo(
		() => projectsQuerySchema.parse(filters),
		[filters],
	);

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.projects.list(validatedParams),
		queryFn: () => getAllProjects(validatedParams),
	});

	if (isLoading) return <ProjectsTableLoader />;
	if (data && data.meta.total === 0) return <EmptyProjects />;

	return (
		<>
			{data && data.meta.total > 0 && (
				<ProjectsTable projects={data.data} totalPages={data.meta.totalPages} />
			)}
		</>
	);
};
