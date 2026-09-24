'use client';

import {
	Button,
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { Project } from '@/types/project/project.types';
import Link from 'next/link';
import { MdMoreVert, MdOutlineEdit } from 'react-icons/md';
import { ProjectHeaderDropdownDelete } from './ProjectHeaderDropdownDelete';
import { ProjectHeaderDropdownItemAlertSettings } from './ProjectHeaderDropdownItems/ProjectHeaderDropdownItemAlertSettings';

interface ProjectHeaderDropdownProps {
	projectData: Project;
}

export const ProjectHeaderDropdown = ({
	projectData,
}: ProjectHeaderDropdownProps) => {
	return (
		<Dropdown>
			<DropdownTrigger asChild>
				<Button isIcon variant="text">
					<MdMoreVert size={20} />
				</Button>
			</DropdownTrigger>
			<DropdownContent
				side="bottom"
				align="end"
				menuWidth="max-content"
				collisionPadding={{ right: 16 }}
			>
				<DropdownItem asChild>
					<Link href={PRIVATE_PAGES.PROJECTS.EDIT(projectData.id)}>
						<MdOutlineEdit size={20} />
						Edit
					</Link>
				</DropdownItem>
				<ProjectHeaderDropdownItemAlertSettings id={projectData.id} />
				<ProjectHeaderDropdownDelete
					id={projectData.id}
					projectName={projectData.name}
				/>
			</DropdownContent>
		</Dropdown>
	);
};
