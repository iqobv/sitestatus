'use client';

import { getStatusPageMonitorsBySlug } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import StatusPageMonitor from './StatusPageMonitor/StatusPageMonitor';
import styles from './StatusPageMonitors.module.scss';
import StatusPageMonitorsLoader from './StatusPageMonitorsLoader';

interface StatusPageMonitorsProps {
	slug: string;
}

const StatusPageMonitors = ({ slug }: StatusPageMonitorsProps) => {
	const { data, isLoading, error } = useQuery({
		queryKey: QUERY_KEYS.statusPage.monitorsBySlug(slug),
		queryFn: () => getStatusPageMonitorsBySlug(slug),
		enabled: !!slug,
	});

	if (isLoading) return <StatusPageMonitorsLoader />;
	if (error) return notFound();
	if (!data) return notFound();

	return (
		<div className={styles.monitors}>
			{data.map((monitor) => (
				<StatusPageMonitor key={monitor.id} monitor={monitor} />
			))}
		</div>
	);
};

export default StatusPageMonitors;
