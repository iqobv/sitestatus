'use client';

import { MonitorWithPingResults } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styles from './MonitorsTable.module.scss';
import { COLUMNS } from './monitorsTableColumns';

dayjs.extend(relativeTime);

interface MonitorsTableRowProps {
	monitor: MonitorWithPingResults;
}

const MonitorsTableRow = ({ monitor }: MonitorsTableRowProps) => {
	return (
		<tr className={styles['monitors-table__row']} key={monitor.id}>
			{COLUMNS.map((column) => (
				<td className={styles['monitors-table__cell']} key={column.accessor}>
					{column.render(monitor)}
				</td>
			))}
		</tr>
	);
};

export default MonitorsTableRow;
