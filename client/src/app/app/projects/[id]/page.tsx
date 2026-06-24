import { getServerAllMonitorsByProjectId } from '@/api/monitor/getAllMonitors.api';
import { getServerProjectById } from '@/api/project/getProjectById.api';
import { monitorFiltersSearchParamsCache } from '@/components/monitors/Monitors/monitor.searchParams';
import { Project } from '@/components/projects/Project/Project';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { monitorsQuerySchema } from '@/schemas/monitor/monitorsQuery.schema';
import { SearchParams } from '@/types/searchParams.types';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface ProjectPageProps {
	params: Promise<{ id: string }>;
	searchParams: SearchParams;
}

const getCachedProject = cache(async (id: string) => {
	return await getServerProjectById(id);
});

export async function generateMetadata({
	params,
}: ProjectPageProps): Promise<Metadata> {
	const { id } = await params;

	try {
		const project = await getCachedProject(id);
		return {
			title: project?.name || 'Project',
			description: project?.description || 'Project details',
		};
	} catch {
		return {
			title: 'Project',
		};
	}
}

export default async function ProjectPage({
	params,
	searchParams,
}: ProjectPageProps) {
	const { id } = await params;
	const resolvedSearchParams = await searchParams;

	try {
		const project = await getCachedProject(id);

		if (!project) notFound();

		const filters = monitorFiltersSearchParamsCache.parse(resolvedSearchParams);
		const validatedParams = monitorsQuerySchema.parse(filters);

		const queryClient = new QueryClient();

		await queryClient.prefetchQuery({
			queryKey: QUERY_KEYS.projects.detail(id),
			queryFn: () => getCachedProject(id),
		});

		await queryClient.prefetchQuery({
			queryKey: QUERY_KEYS.monitors.byProject(id, validatedParams),
			queryFn: () => getServerAllMonitorsByProjectId(id, validatedParams),
		});

		return (
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Project />
			</HydrationBoundary>
		);
	} catch {
		notFound();
	}
}
