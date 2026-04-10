'use client';

import { getMonitors } from '@/api';
import { Button } from '@/components/ui';
import { PAGES, QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { MonitorWithMonitorStats } from '@/types';
import { useQuery } from '@tanstack/react-query';
import MonitorRefresh from './MonitorRefresh/MonitorRefresh';
import styles from './Monitors.module.scss';
import MonitorsTable from './MonitorsTable/MonitorsTable';

interface MonitorsProps {
	initialData?: MonitorWithMonitorStats[] | null;
}

const Monitors = ({ initialData }: MonitorsProps) => {
	const { isAuthenticated, user } = useAuth();

	const { data, isLoading } = useQuery({
		queryFn: getMonitors,
		queryKey: QUERY_KEYS.monitors.list(user ? user.id : ''),
		enabled: isAuthenticated && !!user,
		initialData,
	});

	return (
		<>
			<MonitorRefresh />
			{!isLoading && data && data.length > 0 && (
				<>
					<MonitorsTable monitors={data} />
				</>
			)}
			{!isLoading && data && data.length === 0 && (
				<div className={styles['monitors__empty']}>
					<p>No monitors found. Please add a monitor to get started.</p>
					<Button href={PAGES.CREATE_MONITOR}>Add Monitor</Button>
				</div>
			)}
		</>
	);
};

export default Monitors;
