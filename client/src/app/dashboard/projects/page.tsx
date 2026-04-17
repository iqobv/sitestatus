import { getServerAllProjects } from '@/api';
import { Projects, ProjectsHeader } from '@/components/projects';
import { QUERY_KEYS } from '@/config';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Projects',
};

export default async function ProjectsPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: QUERY_KEYS.project.all,
		queryFn: getServerAllProjects,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProjectsHeader />
			<Projects />
		</HydrationBoundary>
	);
}
