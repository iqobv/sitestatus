'use client';

import { Button, Dropdown } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { Project } from '@/types/project';
import Link from 'next/link';
import { MdMoreVert, MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import styles from './ProjectHeaderDropdown.module.scss';
import ProjectHeaderDropdownItemPublicPage from './ProjectHeaderDropdownItems/ProjectHeaderDropdownItemPublicPage';

interface ProjectHeaderDropdownProps {
	projectData: Project;
}

const ProjectHeaderDropdown = ({ projectData }: ProjectHeaderDropdownProps) => {
	return (
		<Dropdown placement="bottom-end">
			<Dropdown.Trigger>
				<Button isIcon variant="text">
					<MdMoreVert size={20} />
				</Button>
			</Dropdown.Trigger>
			<Dropdown.Menu>
				<Dropdown.Item asChild>
					<Link href={PRIVATE_PAGES.PROJECTS.EDIT(projectData.id)}>
						<MdOutlineEdit size={20} />
						Edit
					</Link>
				</Dropdown.Item>
				<ProjectHeaderDropdownItemPublicPage data={projectData} />
				<Dropdown.Item asChild className={styles.deleteButton}>
					<MdOutlineDelete size={20} />
					Delete
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default ProjectHeaderDropdown;
