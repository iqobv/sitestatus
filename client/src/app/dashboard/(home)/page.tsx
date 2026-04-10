import { Monitors } from '@/components/monitors';
import { MonitorWithPingResults } from '@/types';
import { serverFetcher } from '@/utils';
import { Metadata } from 'next';
import styles from './home.module.scss';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Your dashboard overview',
};

export default async function DashboardPage() {
	const initialData = await serverFetcher<MonitorWithPingResults[]>(
		'/v1/monitors/me',
		{
			method: 'GET',
			cache: 'no-store',
		},
	).catch(() => null);

	return (
		<div className={`${styles['home']} page container fade`}>
			<Monitors initialData={initialData} />
		</div>
	);
}
