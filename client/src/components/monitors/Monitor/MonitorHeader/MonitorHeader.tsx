'use client';

import { Button, SectionHeader } from '@/components/ui';
import { PAGES } from '@/config';
import { IMonitorWithPingResults } from '@/types';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import styles from './MonitorHeader.module.scss';

interface MonitorHeaderProps {
	monitor: IMonitorWithPingResults;
}

const MonitorHeader = ({ monitor }: MonitorHeaderProps) => {
	return (
		<div className={styles['monitor-header']}>
			<SectionHeader
				title={monitor.name}
				description={'Details about the monitor'}
			/>
			<div className={styles['monitor-header__actions']}>
				<Button
					href={PAGES.MONITOR_EDIT(monitor.id)}
					fullWidth
					variant="outlined"
				>
					<MdOutlineEdit size={20} />
					Edit Monitor
				</Button>
				<Button fullWidth variant="danger">
					<MdOutlineDelete size={20} />
					Delete Monitor
				</Button>
			</div>
		</div>
	);
};

export default MonitorHeader;
