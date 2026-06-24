import { getUserStatusPages } from '@/api';
import { StatusPages } from '@/components/statusPage/StatusPages/StatusPages';
import { statusPagesFiltersSearchParamsCache } from '@/components/statusPage/StatusPages/statusPages.searchParams';
import { QUERY_KEYS } from '@/config';
import { statusPagesQuerySchema } from '@/schemas/statusPage/statusPagesQuery.schema';
import { SearchParams } from '@/types/searchParams.types';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';

interface StatusPagesPageProps {
	searchParams: SearchParams;
}

export default async function StatusPagesPage({
	searchParams,
}: StatusPagesPageProps) {
	const resolvedSearchParams = await searchParams;

	const filters =
		statusPagesFiltersSearchParamsCache.parse(resolvedSearchParams);
	const validatedParams = statusPagesQuerySchema.parse(filters);

	const queryClient = new QueryClient();

	queryClient.prefetchQuery({
		queryKey: QUERY_KEYS.statusPages.list(validatedParams),
		queryFn: () => getUserStatusPages(validatedParams),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<StatusPages />
		</HydrationBoundary>
	);
}
