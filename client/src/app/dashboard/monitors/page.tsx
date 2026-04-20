import { getServerAllMonitors } from '@/api';
import { MonitorsAll } from '@/components/monitors';
import { QUERY_KEYS } from '@/config';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Monitors',
};

export default async function MonitorsPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: QUERY_KEYS.monitors.list,
		queryFn: () => getServerAllMonitors(),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div>
				<MonitorsAll />
			</div>
		</HydrationBoundary>
	);
}
