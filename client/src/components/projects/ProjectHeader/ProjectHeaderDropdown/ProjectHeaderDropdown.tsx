'use client';

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { Project } from '@/types/project';
import Link from 'next/link';
import { MdMoreVert, MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import styles from './ProjectHeaderDropdown.module.scss';
import { ProjectHeaderDropdownItemAlertSettings } from './ProjectHeaderDropdownItems/ProjectHeaderDropdownItemAlertSettings';

interface ProjectHeaderDropdownProps {
	projectData: Project;
}

export const ProjectHeaderDropdown = ({
	projectData,
}: ProjectHeaderDropdownProps) => {
	return (
		<Dropdown placement="bottom-end">
			<DropdownTrigger>
				<Button isIcon variant="text">
					<MdMoreVert size={20} />
				</Button>
			</DropdownTrigger>
			<DropdownMenu zIndex={1400}>
				<DropdownItem asChild>
					<Link href={PRIVATE_PAGES.PROJECTS.EDIT(projectData.id)}>
						<MdOutlineEdit size={20} />
						Edit
					</Link>
				</DropdownItem>
				<ProjectHeaderDropdownItemAlertSettings id={projectData.id} />
				<DropdownItem asChild className={styles.deleteButton} isDelete>
					<MdOutlineDelete size={20} />
					Delete
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};
