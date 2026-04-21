'use client';

import { getAllMonitorsByProjectId } from '@/api';
import { Monitors } from '@/components/monitors';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { useProjectId } from '../useProjectId.hook';
import styles from './ProjectMonitors.module.scss';

const ProjectMonitors = () => {
	const { id } = useProjectId();

	return (
		<div className={styles.monitors}>
			<Monitors
				queryKey={QUERY_KEYS.monitors.allByProjectId(id)}
				queryFn={() => getAllMonitorsByProjectId(id)}
				createHref={`${PRIVATE_PAGES.MONITORS.NEW}?projectId=${id}`}
			/>
		</div>
	);
};

export default ProjectMonitors;
