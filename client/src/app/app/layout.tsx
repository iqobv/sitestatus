import { DashboardHeader, Sidebar } from '@/components/layout';
import styles from './dashboardLayout.module.scss';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={styles.layout}>
			<Sidebar />
			<div className={styles.content}>
				<DashboardHeader />
				<main className={styles.main}>{children}</main>
			</div>
		</div>
	);
}
