'use client';

import { Button } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import Link from 'next/link';
import styles from './EmptyProjects.module.scss';

export const EmptyProjects = () => {
	return (
		<div className={styles.empty}>
			<p className={styles.message}>You don't have any projects yet.</p>
			<Button asChild>
				<Link href={PRIVATE_PAGES.PROJECTS.NEW}>New Project</Link>
			</Button>
		</div>
	);
};
