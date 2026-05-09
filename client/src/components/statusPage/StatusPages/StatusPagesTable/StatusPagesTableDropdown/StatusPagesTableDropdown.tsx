'use client';

import { Button, Dropdown } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { StatusPage } from '@/types';
import Link from 'next/link';
import { IconBaseProps } from 'react-icons';
import { MdEdit, MdMoreVert } from 'react-icons/md';
import StatusPagesTableDropdownDelete from './StatusPagesTableDropdownDelete';

interface StatusPagesTableDropdownProps {
	statusPage: StatusPage;
}

export const iconProps: IconBaseProps = {
	size: 20,
};

const StatusPagesTableDropdown = ({
	statusPage,
}: StatusPagesTableDropdownProps) => {
	return (
		<Dropdown>
			<Dropdown.Trigger>
				<Button size="sm" isIcon variant="text">
					<MdMoreVert size={20} />
				</Button>
			</Dropdown.Trigger>
			<Dropdown.Menu menuWidth="max-content" zIndex={1000}>
				<Dropdown.Item asChild>
					<Link href={PRIVATE_PAGES.STATUS_PAGES.ID(statusPage.id)}>
						<MdEdit {...iconProps} /> Edit
					</Link>
				</Dropdown.Item>
				<StatusPagesTableDropdownDelete id={statusPage.id} />
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default StatusPagesTableDropdown;
