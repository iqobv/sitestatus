'use client';

import { Button } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import styles from './EmptyProjects.module.scss';

const EmptyProjects = () => {
	return (
		<div className={styles.empty}>
			<p className={styles.message}>You don't have any projects yet.</p>
			<Button href={PRIVATE_PAGES.PROJECTS.NEW}>New Project</Button>
		</div>
	);
};

export default EmptyProjects;
