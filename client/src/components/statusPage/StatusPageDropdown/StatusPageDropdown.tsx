'use client';

import {
	Button,
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { StatusPage } from '@/types/statusPage/statusPage.types';
import Link from 'next/link';
import { IconBaseProps } from 'react-icons';
import { MdEdit, MdMoreVert } from 'react-icons/md';
import { StatusPageDropdownDelete } from './StatusPageDropdownDelete';
import { StatusPageDropdownPublish } from './StatusPageDropdownPublish';

interface StatusPageDropdownProps {
	statusPage: StatusPage;
	showEdit?: boolean;
	redirectOnDelete?: boolean;
	refetchByIdOnSuccess?: boolean;
}

export const iconProps: IconBaseProps = {
	size: 20,
};

export const StatusPageDropdown = ({
	statusPage,
	showEdit = true,
	redirectOnDelete = false,
	refetchByIdOnSuccess = false,
}: StatusPageDropdownProps) => {
	return (
		<Dropdown>
			<DropdownTrigger asChild>
				<Button size="sm" isIcon variant="text">
					<MdMoreVert size={20} />
				</Button>
			</DropdownTrigger>
			<DropdownContent
				menuWidth="max-content"
				style={{ minWidth: '180px' }}
				side="bottom"
				align="end"
			>
				{showEdit && (
					<DropdownItem asChild>
						<Link href={PRIVATE_PAGES.STATUS_PAGES.ID(statusPage.id)}>
							<MdEdit {...iconProps} /> Edit
						</Link>
					</DropdownItem>
				)}
				<StatusPageDropdownPublish
					data={statusPage}
					refetchByIdOnSuccess={refetchByIdOnSuccess}
				/>
				<StatusPageDropdownDelete
					id={statusPage.id}
					name={statusPage.title}
					redirectOnDelete={redirectOnDelete}
				/>
			</DropdownContent>
		</Dropdown>
	);
};
