import { getServerStatusPageBySlug } from '@/api';
import { StatusPage as StatusPageComponent } from '@/components/statusPage';
import { QUERY_KEYS } from '@/config';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface StatusPageProps {
	params: Promise<{ slug: string }>;
}

const getCachedStatusPage = cache(async (slug: string) => {
	return await getServerStatusPageBySlug(slug);
});

export async function generateMetadata({
	params,
}: StatusPageProps): Promise<Metadata> {
	const { slug } = await params;

	try {
		const project = await getCachedStatusPage(slug);
		return {
			title: project?.title || 'Status Page',
		};
	} catch {
		return {
			title: 'Status Page',
		};
	}
}

export default async function StatusPage({ params }: StatusPageProps) {
	const { slug } = await params;

	try {
		const monitor = await getCachedStatusPage(slug);

		if (!monitor) notFound();

		const queryClient = new QueryClient();

		await queryClient.prefetchQuery({
			queryKey: QUERY_KEYS.statusPage.bySlug(slug),
			queryFn: () => getCachedStatusPage(slug),
		});

		return (
			<div className="container">
				<HydrationBoundary state={dehydrate(queryClient)}>
					<StatusPageComponent />
				</HydrationBoundary>
			</div>
		);
	} catch {
		notFound();
	}
}
