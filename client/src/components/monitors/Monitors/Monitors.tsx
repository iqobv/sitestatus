'use client';

import { Button } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { FullMonitor } from '@/types';
import {
	keepPreviousData,
	useQuery,
	UseQueryOptions,
} from '@tanstack/react-query';
import MonitorRefresh from './MonitorRefresh/MonitorRefresh';
import styles from './Monitors.module.scss';
import MonitorsTable from './MonitorsTable/MonitorsTable';

interface MonitorsProps extends UseQueryOptions<FullMonitor[]> {
	createHref?: string;
}

const Monitors = ({
	queryKey,
	queryFn,
	placeholderData,
	createHref = PRIVATE_PAGES.MONITORS.NEW,
	...rest
}: MonitorsProps) => {
	const { data, isLoading } = useQuery({
		queryFn,
		queryKey,
		placeholderData: placeholderData ?? keepPreviousData,
		...rest,
	});

	return (
		<>
			<MonitorRefresh queryKey={queryKey} />
			{!isLoading && data && data.length > 0 && (
				<>
					<MonitorsTable monitors={data} />
				</>
			)}
			{!isLoading && data && data.length === 0 && (
				<div className={styles['monitors__empty']}>
					<p>No monitors found. Please add a monitor to get started.</p>
					<Button href={createHref}>Add Monitor</Button>
				</div>
			)}
		</>
	);
};

export default Monitors;
