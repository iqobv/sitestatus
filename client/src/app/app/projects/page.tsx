import { getServerAllProjects } from '@/api';
import { Projects } from '@/components/projects/Projects/Projects';
import { projectFiltersSearchParamsCache } from '@/components/projects/Projects/projects.searchParams';
import { ProjectsHeader } from '@/components/projects/ProjectsHeader/ProjectsHeader';
import { QUERY_KEYS } from '@/config';
import { projectsQuerySchema } from '@/schemas/project/projectsQuery.schema';
import { SearchParams } from '@/types/searchParams.types';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

interface MonitorsPageProps {
	searchParams: SearchParams;
}

export const metadata: Metadata = {
	title: 'Projects',
};

export default async function ProjectsPage({
	searchParams,
}: MonitorsPageProps) {
	const resolvedSearchParams = await searchParams;

	const filters = projectFiltersSearchParamsCache.parse(resolvedSearchParams);
	const validatedParams = projectsQuerySchema.parse(filters);

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: QUERY_KEYS.projects.list(validatedParams),
		queryFn: () => getServerAllProjects(validatedParams),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProjectsHeader />
			<Projects />
		</HydrationBoundary>
	);
}
