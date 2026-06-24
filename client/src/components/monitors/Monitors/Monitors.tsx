'use client';

import { Button } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { MonitorsQueryDto } from '@/dto';
import { monitorsQuerySchema } from '@/schemas/monitor/monitorsQuery.schema';
import { PaginatedMonitors } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { MonitorRefresh } from './MonitorRefresh/MonitorRefresh';
import styles from './Monitors.module.scss';
import { MonitorsLoader } from './MonitorsLoader';
import { MonitorsTable } from './MonitorsTable/MonitorsTable';
import { useMonitorFilters } from './useMonitorFilters.hook';

interface MonitorsProps {
	createHref?: string;
	fetcher: (params: MonitorsQueryDto) => Promise<PaginatedMonitors>;
	queryKeyBase: readonly unknown[] | unknown[];
	queryKeyFactory: (
		validatedParams: MonitorsQueryDto,
	) => readonly unknown[] | unknown[];
}

export const Monitors = ({
	queryKeyBase,
	fetcher,
	queryKeyFactory,
	createHref = PRIVATE_PAGES.MONITORS.NEW,
}: MonitorsProps) => {
	const [filters] = useMonitorFilters();

	const validatedParams = useMemo(
		() => monitorsQuerySchema.parse(filters),
		[filters],
	);

	const queryKey = queryKeyFactory(validatedParams);

	const { data, isLoading } = useQuery({
		queryFn: () => {
			const validatedParams = monitorsQuerySchema.parse(filters);
			return fetcher(validatedParams);
		},
		queryKey,
		placeholderData: keepPreviousData,
	});

	if (isLoading) return <MonitorsLoader />;

	return (
		<>
			<MonitorRefresh queryKey={queryKeyBase} />
			{!isLoading && data && data.meta.total > 0 && (
				<>
					<MonitorsTable
						monitors={data.data}
						totalPages={data.meta.totalPages}
					/>
				</>
			)}
			{!isLoading && data && data.meta.total === 0 && (
				<div className={styles.empty}>
					<p>No monitors found. Please add a monitor to get started.</p>
					<Button href={createHref}>Add Monitor</Button>
				</div>
			)}
		</>
	);
};
