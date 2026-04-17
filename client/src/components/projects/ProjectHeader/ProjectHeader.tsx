import { Button, SectionHeader } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { Project } from '@/types/project';
import { FiPlus } from 'react-icons/fi';
import styles from './ProjectHeader.module.scss';
import ProjectHeaderDropdown from './ProjectHeaderDropdown/ProjectHeaderDropdown';

const ProjectHeader = ({ projectData }: { projectData: Project }) => {
	return (
		<div className={styles.header}>
			<SectionHeader
				title={projectData?.name || 'Project'}
				description={projectData?.description || 'No description available'}
			/>
			<div className={styles.headerActions}>
				<Button
					className={styles.headerButton}
					href={`${PRIVATE_PAGES.MONITORS.NEW}?projectId=${projectData?.id}`}
				>
					<FiPlus size={20} />
					<p className={styles.headerButtonText}>Add New Monitor</p>
				</Button>
				<ProjectHeaderDropdown projectData={projectData} />
			</div>
		</div>
	);
};

export default ProjectHeader;
