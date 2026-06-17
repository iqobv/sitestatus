'use client';

import { getDashboard } from '@/api/dashboard/dashboard.api';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import styles from './Dashboard.module.scss';
import { DASHBOARD_CARDS } from './dashboardCards';
import { DashboardLoader } from './DashboardLoader';
import { DashboardSection } from './DashboardSection/DashboardSection';

export const Dashboard = () => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.dashboard.base,
		queryFn: getDashboard,
	});

	if (isLoading) return <DashboardLoader />;
	if (!data) return null;

	return (
		<div className={styles.grid}>
			{DASHBOARD_CARDS(data).map((section) => (
				<DashboardSection key={section.title} {...section} />
			))}
		</div>
	);
};
