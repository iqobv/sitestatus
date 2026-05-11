'use client';

import { Button, Dropdown } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { StatusPage } from '@/types';
import Link from 'next/link';
import { IconBaseProps } from 'react-icons';
import { MdEdit, MdMoreVert } from 'react-icons/md';
import StatusPageDropdownDelete from './StatusPageDropdownDelete';
import StatusPageDropdownPublish from './StatusPageDropdownPublish';

interface StatusPageDropdownProps {
	statusPage: StatusPage;
	showEdit?: boolean;
	redirectOnDelete?: boolean;
	refetchByIdOnSuccess?: boolean;
}

export const iconProps: IconBaseProps = {
	size: 20,
};

const StatusPageDropdown = ({
	statusPage,
	showEdit = true,
	redirectOnDelete = false,
	refetchByIdOnSuccess = false,
}: StatusPageDropdownProps) => {
	return (
		<Dropdown>
			<Dropdown.Trigger>
				<Button size="sm" isIcon variant="text">
					<MdMoreVert size={20} />
				</Button>
			</Dropdown.Trigger>
			<Dropdown.Menu menuWidth="max-content" zIndex={1000}>
				{showEdit && (
					<Dropdown.Item asChild>
						<Link href={PRIVATE_PAGES.STATUS_PAGES.ID(statusPage.id)}>
							<MdEdit {...iconProps} /> Edit
						</Link>
					</Dropdown.Item>
				)}
				<StatusPageDropdownPublish
					data={statusPage}
					refetchByIdOnSuccess={refetchByIdOnSuccess}
				/>
				<StatusPageDropdownDelete
					id={statusPage.id}
					redirectOnDelete={redirectOnDelete}
				/>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default StatusPageDropdown;
