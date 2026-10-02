import { DashboardHeader } from '@/components/layout/dashboard/DashboardHeader/DashboardHeader';
import { Sidebar } from '@/components/layout/dashboard/Sidebar/Sidebar';
import { AuthGuard } from '@/providers/AuthGuard';
import { Suspense } from 'react';
import styles from './dashboardLayout.module.scss';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Suspense fallback={null}>
			<AuthGuard>
				<div className={styles.layout}>
					<Sidebar />
					<div className={styles.content}>
						<DashboardHeader />
						<main className={styles.main}>{children}</main>
					</div>
				</div>
			</AuthGuard>
		</Suspense>
	);
}
