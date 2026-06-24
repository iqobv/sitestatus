'use client';

import { getServerProjectById } from '@/api';
import { IconButton, SectionHeader } from '@/components/ui';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';
import styles from './ProjectHeader.module.scss';
import { ProjectHeaderDropdown } from './ProjectHeaderDropdown/ProjectHeaderDropdown';
import { ProjectHeaderLoader } from './ProjectHeaderLoader';

export const ProjectHeader = () => {
	const { id } = useParams<{ id: string }>();

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.projects.detail(id),
		queryFn: () => getServerProjectById(id),
	});

	if (isLoading) return <ProjectHeaderLoader />;
	if (!data) return null;

	return (
		<SectionHeader
			title={data.name || 'Project'}
			description={data.description || 'No description available'}
			rightSlot={
				<div className={styles.headerActions}>
					<IconButton
						Icon={FiPlus}
						href={`${PRIVATE_PAGES.MONITORS.NEW}?projectId=${data.id}`}
					>
						Add New Monitor
					</IconButton>
					<ProjectHeaderDropdown projectData={data} />
				</div>
			}
		/>
	);
};
