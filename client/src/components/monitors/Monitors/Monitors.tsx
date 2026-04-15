'use client';

import { getMonitors } from '@/api';
import { Button } from '@/components/ui';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import MonitorRefresh from './MonitorRefresh/MonitorRefresh';
import styles from './Monitors.module.scss';
import MonitorsTable from './MonitorsTable/MonitorsTable';

const Monitors = () => {
	const { isAuthenticated, user } = useAuth();

	const { data, isLoading } = useQuery({
		queryFn: getMonitors,
		queryKey: QUERY_KEYS.monitors.list,
		enabled: isAuthenticated && !!user,
		placeholderData: keepPreviousData,
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
					<Button href={PRIVATE_PAGES.CREATE_MONITOR}>Add Monitor</Button>
				</div>
			)}
		</>
	);
};

export default Monitors;
