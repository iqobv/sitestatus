'use client';

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@/components/ui';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { MonitorWithRegions } from '@/types/monitors/monitor.types';
import Link from 'next/link';
import { MdMoreVert, MdOutlineEdit } from 'react-icons/md';
import { MonitorDeleteModal } from './MonitorDeleteModal';
import { MonitorDropdownAlertSettings } from './MonitorDropdownAlertSettings';
import { MonitorDropdownUpdateActiveStatus } from './MonitorDropdownUpdateActiveStatus';
import styles from './MonitorHeader.module.scss';

interface MonitorHeaderDropdownProps {
	monitor: MonitorWithRegions;
}

export const MonitorHeaderDropdown = ({
	monitor,
}: MonitorHeaderDropdownProps) => {
	return (
		<Dropdown placement="bottom-end">
			<DropdownTrigger>
				<Button isIcon variant="text">
					<MdMoreVert size={20} />
				</Button>
			</DropdownTrigger>
			<DropdownMenu zIndex={1300}>
				<DropdownItem asChild>
					<Link
						href={PRIVATE_PAGES.MONITORS.EDIT(monitor.id)}
						className={styles.dropdownItem}
					>
						<MdOutlineEdit size={20} />
						Edit
					</Link>
				</DropdownItem>
				<MonitorDropdownUpdateActiveStatus monitor={monitor} />
				<MonitorDropdownAlertSettings id={monitor.id} />
				<MonitorDeleteModal id={monitor.id} />
			</DropdownMenu>
		</Dropdown>
	);
};
