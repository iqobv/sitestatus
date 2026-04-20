'use client';

import { Button } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { Project } from '@/types/project';
import styles from './ProjectItem.module.scss';

interface ProjectItemProps {
	project: Project;
}

const ProjectItem = ({ project }: ProjectItemProps) => {
	return (
		<div className={styles.item}>
			<div className={styles.content}>
				<p className={styles.projectSlug}>{project.slug}</p>
				<div className={styles.projectInfo}>
					<h2 className={styles.projectName}>{project.name}</h2>
					<p className={styles.projectDescription}>{project.description}</p>
				</div>
			</div>
			<Button
				href={PRIVATE_PAGES.PROJECTS.ID(project.id)}
				variant="link"
				fullWidth
			>
				View Project
			</Button>
		</div>
	);
};

export default ProjectItem;
