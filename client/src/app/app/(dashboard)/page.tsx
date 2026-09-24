import { Dashboard } from '@/components/dashboard/Dashboard';
import { Metadata } from 'next';
import styles from './home.module.scss';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default function DashboardPage() {
	return (
		<div className={`${styles.home} fade`}>
			<Dashboard />
		</div>
	);
}
