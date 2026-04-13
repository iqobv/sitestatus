'use client';

import { Button, Dropdown } from '@/components/ui';
import { PAGES } from '@/config';
import Link from 'next/link';
import { MdMoreVert, MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import styles from './MonitorHeader.module.scss';

interface MonitorHeaderDropdownProps {
	monitorId: string;
}

const MonitorHeaderDropdown = ({ monitorId }: MonitorHeaderDropdownProps) => {
	return (
		<Dropdown placement="bottom-end">
			<Dropdown.Trigger>
				<Button isIcon variant="text">
					<MdMoreVert size={20} />
				</Button>
			</Dropdown.Trigger>
			<Dropdown.Menu>
				<Dropdown.Item asChild>
					<Link
						href={PAGES.MONITOR_EDIT(monitorId)}
						className={styles['monitor-header__dropdown-item']}
					>
						<MdOutlineEdit size={20} />
						Edit
					</Link>
				</Dropdown.Item>
				<Dropdown.Item asChild>
					<button
						className={`${styles['monitor-header__dropdown-item']} ${styles['monitor-header__dropdown-item--delete']}`}
					>
						<MdOutlineDelete size={20} />
						Delete
					</button>
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default MonitorHeaderDropdown;
