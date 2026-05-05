'use client';

import { Button, Dropdown } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { MonitorWithRegions } from '@/types';
import Link from 'next/link';
import { MdMoreVert, MdOutlineEdit } from 'react-icons/md';
import MonitorDeleteModal from './MonitorDeleteModal';
import MonitorDropdownAlertSettings from './MonitorDropdownAlertSettings';
import MonitorDropdownUpdateActiveStatus from './MonitorDropdownUpdateActiveStatus';
import styles from './MonitorHeader.module.scss';

interface MonitorHeaderDropdownProps {
	monitor: MonitorWithRegions;
}

const MonitorHeaderDropdown = ({ monitor }: MonitorHeaderDropdownProps) => {
	return (
		<Dropdown placement="bottom-end">
			<Dropdown.Trigger>
				<Button isIcon variant="text">
					<MdMoreVert size={20} />
				</Button>
			</Dropdown.Trigger>
			<Dropdown.Menu zIndex={1300}>
				<Dropdown.Item asChild>
					<Link
						href={PRIVATE_PAGES.MONITORS.EDIT(monitor.id)}
						className={styles.dropdownItem}
					>
						<MdOutlineEdit size={20} />
						Edit
					</Link>
				</Dropdown.Item>
				<MonitorDropdownUpdateActiveStatus monitor={monitor} />
				<MonitorDropdownAlertSettings id={monitor.id} />
				<MonitorDeleteModal id={monitor.id} />
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default MonitorHeaderDropdown;
