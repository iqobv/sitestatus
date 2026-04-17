import { getServerAllMonitorsByProjectId, getServerProjectById } from '@/api';
import { Project, ProjectHeader } from '@/components/projects';
import { QUERY_KEYS } from '@/config';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { cache } from 'react';

interface ProjectPageProps {
	params: Promise<{ id: string }>;
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

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { id } = await params;

	const queryClient = new QueryClient();

	const projectData = await queryClient.fetchQuery({
		queryKey: QUERY_KEYS.project.byId(id),
		queryFn: () => getCachedProject(id),
	});

	await queryClient.prefetchQuery({
		queryKey: QUERY_KEYS.monitors.allByProjectId(id),
		queryFn: () => getServerAllMonitorsByProjectId(id),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProjectHeader projectData={projectData} />
			<Project />
		</HydrationBoundary>
	);
}
