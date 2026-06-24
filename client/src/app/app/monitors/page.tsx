import { getServerAllMonitors } from '@/api';
import { MonitorsAll } from '@/components/monitors/Monitors/MonitorsAll';
import { monitorFiltersSearchParamsCache } from '@/components/monitors/Monitors/monitor.searchParams';
import { QUERY_KEYS } from '@/config';
import { monitorsQuerySchema } from '@/schemas/monitor/monitorsQuery.schema';
import { SearchParams } from '@/types/searchParams.types';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Monitors',
};

interface MonitorsPageProps {
	searchParams: SearchParams;
}

export default async function MonitorsPage({
	searchParams,
}: MonitorsPageProps) {
	const resolvedSearchParams = await searchParams;

	const filters = monitorFiltersSearchParamsCache.parse(resolvedSearchParams);
	const validatedParams = monitorsQuerySchema.parse(filters);

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: QUERY_KEYS.monitors.list(validatedParams),
		queryFn: () => getServerAllMonitors(validatedParams),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<MonitorsAll />
		</HydrationBoundary>
	);
}
