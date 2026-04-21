import { Button, SectionHeader } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { FiPlus } from 'react-icons/fi';
import styles from './ProjectsHeader.module.scss';

const ProjectsHeader = () => {
	return (
		<div className={styles.header}>
			<SectionHeader
				title="Projects"
				description="Manage your projects here."
			/>
			<Button
				href={PRIVATE_PAGES.PROJECTS.NEW}
				className={styles.createProjectButton}
			>
				<FiPlus size={20} />
				<p className={styles.createProjectLabel}>Create Project</p>
			</Button>
		</div>
	);
};

export default ProjectsHeader;
