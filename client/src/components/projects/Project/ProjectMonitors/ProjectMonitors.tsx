'use client';

import { getAllMonitorsByProjectId } from '@/api/monitor/getAllMonitors.api';
import { Monitors } from '@/components/monitors/Monitors/Monitors';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useProjectId } from '../useProjectId.hook';

export const ProjectMonitors = () => {
	const { id } = useProjectId();

	return (
		<Monitors
			queryKeyBase={QUERY_KEYS.monitors.byProjectBase(id)}
			fetcher={(params) => getAllMonitorsByProjectId(id, params)}
			queryKeyFactory={(params) => QUERY_KEYS.monitors.byProject(id, params)}
			createHref={`${PRIVATE_PAGES.MONITORS.NEW}?projectId=${id}`}
		/>
	);
};
