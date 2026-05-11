import { getServerStatusPageById } from '@/api';
import { StatusPageDetails } from '@/components/statusPage';
import { QUERY_KEYS } from '@/config';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface StatusPageDetailProps {
	params: Promise<{ id: string }>;
}

const getCachedStatusPage = cache(async (id: string) => {
	return await getServerStatusPageById(id);
});

export async function generateMetadata({
	params,
}: StatusPageDetailProps): Promise<Metadata> {
	const { id } = await params;

	try {
		const project = await getCachedStatusPage(id);
		return {
			title: project?.title || 'Status Page',
			description: project?.description || 'Status page details',
		};
	} catch {
		return {
			title: 'Status Page',
		};
	}
}
export default async function StatusPageDetailPage({
	params,
}: StatusPageDetailProps) {
	const { id } = await params;

	try {
		const project = await getCachedStatusPage(id);

		if (!project) notFound();

		const queryClient = new QueryClient();

		await queryClient.prefetchQuery({
			queryKey: QUERY_KEYS.statusPage.byId(id),
			queryFn: () => getCachedStatusPage(id),
		});

		return (
			<HydrationBoundary state={dehydrate(queryClient)}>
				<StatusPageDetails />
			</HydrationBoundary>
		);
	} catch {
		notFound();
	}
}
