import { getServerMonitorByIdFull } from '@/api';
import { Monitor } from '@/components/monitors';
import { QUERY_KEYS } from '@/config';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { cache } from 'react';

interface MonitorPageProps {
	params: Promise<{ id: string }>;
}

const getCachedMonitor = cache(async (id: string) => {
	return await getServerMonitorByIdFull(id);
});

export async function generateMetadata({
	params,
}: MonitorPageProps): Promise<Metadata> {
	const { id } = await params;

	try {
		const monitor = await getCachedMonitor(id);
		return {
			title: monitor?.name || 'Monitor',
		};
	} catch {
		return {
			title: 'Monitor',
		};
	}
}

export default async function MonitorPage({ params }: MonitorPageProps) {
	const { id } = await params;

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: QUERY_KEYS.monitors.byIdFull(id),
		queryFn: () => getCachedMonitor(id),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="fade">
				<Monitor id={id} />
			</div>
		</HydrationBoundary>
	);
}
