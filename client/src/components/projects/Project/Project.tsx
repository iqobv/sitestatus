'use client';

import styles from './Project.module.scss';
import ProjectMonitors from './ProjectMonitors/ProjectMonitors';

const Project = () => {
	return (
		<div className={styles.project}>
			<ProjectMonitors />
		</div>
	);
};

export default Project;
