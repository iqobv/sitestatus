import { DashboardHeader, Sidebar } from '@/components/layout';
import styles from './dashboardLayout.module.scss';

export default function DashboardLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<div className={styles['dashboard-layout']}>
			<Sidebar />
			<div className={styles['main-content']}>
				<DashboardHeader />
				<main className={styles['main']}>{children}</main>
			</div>
			{modal}
		</div>
	);
}
