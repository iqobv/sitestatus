'use client';

import { getAllProjects } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import EmptyProjects from './EmptyProjects/EmptyProjects';
import ProjectItem from './ProjectItem/ProjectItem';
import styles from './Projects.module.scss';
import ProjectsLoader from './ProjectsLoader';

const Projects = () => {
	const { data, isLoading } = useQuery({
		queryFn: getAllProjects,
		queryKey: QUERY_KEYS.project.all,
	});

	return (
		<div>
			{isLoading && <ProjectsLoader />}
			{data?.length === 0 && <EmptyProjects />}
			{data && data.length > 0 && (
				<div className={styles.list}>
					{data.map((project) => (
						<ProjectItem key={project.id} project={project} />
					))}
				</div>
			)}
		</div>
	);
};

export default Projects;
