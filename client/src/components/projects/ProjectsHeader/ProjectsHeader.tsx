import { Button, SectionHeader } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import styles from './ProjectsHeader.module.scss';

export const ProjectsHeader = () => {
	return (
		<div className={styles.header}>
			<SectionHeader
				title="Projects"
				description="Manage your projects here."
			/>
			<Button className={styles.createProjectButton} asChild>
				<Link href={PRIVATE_PAGES.PROJECTS.NEW}>
					<FiPlus size={20} />
					<p className={styles.createProjectLabel}>Create Project</p>
				</Link>
			</Button>
		</div>
	);
};
