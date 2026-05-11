'use client';

import { getAllMonitorsByProjectId } from '@/api';
import { Monitors } from '@/components/monitors';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { useProjectId } from '../useProjectId.hook';

const ProjectMonitors = () => {
	const { id } = useProjectId();

	return (
		<Monitors
			queryKey={QUERY_KEYS.monitors.allByProjectId(id)}
			queryFn={() => getAllMonitorsByProjectId(id)}
			createHref={`${PRIVATE_PAGES.MONITORS.NEW}?projectId=${id}`}
		/>
	);
};

export default ProjectMonitors;
