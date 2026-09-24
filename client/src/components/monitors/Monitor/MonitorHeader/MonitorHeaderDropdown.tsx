'use client';

import {
	Button,
	Dropdown,
	DropdownContent,
	DropdownItem,
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
		<Dropdown>
			<DropdownTrigger asChild>
				<Button isIcon variant="text">
					<MdMoreVert size={20} />
				</Button>
			</DropdownTrigger>
			<DropdownContent
				align="end"
				side="bottom"
				style={{ minWidth: '180px' }}
				menuWidth="max-content"
			>
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
				<MonitorDeleteModal id={monitor.id} name={monitor.name} />
			</DropdownContent>
		</Dropdown>
	);
};
