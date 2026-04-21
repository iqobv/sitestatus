'use client';

import { getServerProjectById } from '@/api';
import { Button, SectionHeader } from '@/components/ui';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';
import styles from './ProjectHeader.module.scss';
import ProjectHeaderDropdown from './ProjectHeaderDropdown/ProjectHeaderDropdown';
import ProjectHeaderLoader from './ProjectHeaderLoader';

const ProjectHeader = () => {
	const { id } = useParams<{ id: string }>();

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.project.byId(id),
		queryFn: () => getServerProjectById(id),
	});

	if (isLoading) return <ProjectHeaderLoader />;
	if (!data) return null;

	return (
		<div className={styles.header}>
			<SectionHeader
				title={data.name || 'Project'}
				description={data.description || 'No description available'}
			/>
			<div className={styles.headerActions}>
				<Button
					className={styles.headerButton}
					href={`${PRIVATE_PAGES.MONITORS.NEW}?projectId=${data.id}`}
				>
					<FiPlus size={20} />
					<p className={styles.headerButtonText}>Add New Monitor</p>
				</Button>
				<ProjectHeaderDropdown projectData={data} />
			</div>
		</div>
	);
};

export default ProjectHeader;
