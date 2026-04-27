import { getServerProjectBySlug } from '@/api';
import { PublicPage } from '@/components/projects';
import { QUERY_KEYS } from '@/config';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface PublicProjectPageProps {
	params: Promise<{ slug: string }>;
}

const getCachedProject = cache(async (slug: string) => {
	return await getServerProjectBySlug(slug);
});

export async function generateMetadata({
	params,
}: PublicProjectPageProps): Promise<Metadata> {
	const { slug } = await params;

	try {
		const project = await getCachedProject(slug);
		return {
			title: project?.name || 'Project',
		};
	} catch {
		return {
			title: 'Project',
		};
	}
}

export default async function PublicProjectPage({
	params,
}: PublicProjectPageProps) {
	const { slug } = await params;

	const queryClient = new QueryClient();

	try {
		const project = await queryClient.fetchQuery({
			queryKey: QUERY_KEYS.project.bySlug(slug),
			queryFn: () => getCachedProject(slug),
		});

		if (!project) {
			notFound();
		}
	} catch {
		notFound();
	}

	return (
		<div className="container">
			<HydrationBoundary state={dehydrate(queryClient)}>
				<PublicPage />
			</HydrationBoundary>
		</div>
	);
}
