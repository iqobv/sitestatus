'use client';

import { Table } from '@/components/ui';
import { MonitorWithMonitorStats } from '@/types';
import { getCoreRowModel } from '@tanstack/react-table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styles from './MonitorsTable.module.scss';
import { COLUMNS } from './monitorsTableColumns';

dayjs.extend(relativeTime);

interface MonitorsTableProps {
	monitors: MonitorWithMonitorStats[];
}

const MonitorsTable = ({ monitors }: MonitorsTableProps) => {
	return (
		<div className={styles.container}>
			<Table
				columns={COLUMNS}
				data={monitors}
				getCoreRowModel={getCoreRowModel()}
			/>
		</div>
	);
};

export default MonitorsTable;
