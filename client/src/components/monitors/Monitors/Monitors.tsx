'use client';

import { getMonitors } from '@/api';
import { Button } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import MonitorRefresh from './MonitorRefresh/MonitorRefresh';
import styles from './Monitors.module.scss';
import MonitorsLoader from './MonitorsLoader';
import MonitorsTable from './MonitorsTable/MonitorsTable';

const Monitors = () => {
	const { isAuthenticated, token, user } = useAuth();

	const { data, isLoading } = useQuery({
		queryFn: () => getMonitors(token!),
		queryKey: QUERY_KEYS.monitors.list(user ? user.id : ''),
		enabled: isAuthenticated && !!user && !!token,
	});

	return (
		<div className={`${styles['monitors']} container`}>
			<MonitorRefresh />
			{isLoading && <MonitorsLoader />}
			{!isLoading && data && data.length > 0 && (
				<>
					<MonitorsTable monitors={data} />
				</>
			)}
			{!isLoading && data && data.length === 0 && (
				<div className={styles['monitors__empty']}>
					<p>No monitors found. Please add a monitor to get started.</p>
					<Button>Add Monitor</Button>
				</div>
			)}
		</div>
	);
};

export default Monitors;
