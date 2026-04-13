import { getServerMonitorById } from '@/api';
import { Monitor } from '@/components/monitors';
import { QUERY_KEYS } from '@/config';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';

interface MonitorPageProps {
	params: Promise<{ id: string }>;
}

export default async function MonitorPage({ params }: MonitorPageProps) {
	const { id } = await params;

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: QUERY_KEYS.monitors.byId(id),
		queryFn: () => getServerMonitorById(id),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="page container fade">
				<Monitor id={id} />
			</div>
		</HydrationBoundary>
	);
}
