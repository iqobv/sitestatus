import { getUserStatusPages } from '@/api';
import { StatusPages } from '@/components/statusPage/StatusPages/StatusPages';
import { QUERY_KEYS } from '@/config';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';

export default function StatusPagesPage() {
	const queryClient = new QueryClient();

	queryClient.prefetchQuery({
		queryKey: QUERY_KEYS.statusPages.lists(),
		queryFn: getUserStatusPages,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<StatusPages />
		</HydrationBoundary>
	);
}
