import { getServerDashboard } from '@/api/dashboard/dashboard.api';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { QUERY_KEYS } from '@/config';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import styles from './home.module.scss';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Your dashboard overview',
};

export default async function DashboardPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: QUERY_KEYS.dashboard.base,
		queryFn: getServerDashboard,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className={`${styles.home} fade`}>
				<Dashboard />
			</div>
		</HydrationBoundary>
	);
}
