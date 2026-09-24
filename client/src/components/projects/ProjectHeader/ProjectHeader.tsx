'use client';

import { getProjectById } from '@/api/project/getProjectById.api';
import { IconButton, SectionHeader } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { usePageTitle } from '@/hooks/usePageTitle.hook';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { notFound, useParams } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';
import styles from './ProjectHeader.module.scss';
import { ProjectHeaderDropdown } from './ProjectHeaderDropdown/ProjectHeaderDropdown';
import { ProjectHeaderLoader } from './ProjectHeaderLoader';

export const ProjectHeader = () => {
	const { id } = useParams<{ id: string }>();

	const { data, isLoading, error } = useQuery({
		queryKey: QUERY_KEYS.projects.detail(id),
		queryFn: () => getProjectById(id),
	});

	usePageTitle(data && data.name);

	if (isLoading) return <ProjectHeaderLoader />;
	if (isAxiosError(error) && error.response?.status === 404) notFound();
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
