'use client';

import { IMonitorWithPingResults } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styles from './MonitorsTable.module.scss';
import { COLUMNS } from './monitorsTableColumns';
import MonitorsTableRow from './MonitorsTableRow';

dayjs.extend(relativeTime);

interface MonitorsTableProps {
	monitors: IMonitorWithPingResults[];
}

const MonitorsTable = ({ monitors }: MonitorsTableProps) => {
	return (
		<div className={styles['monitors-table__container']}>
			<table className={styles['monitors-table']}>
				<thead className={styles['monitors-table__header']}>
					<tr className={styles['monitors-table__row']}>
						{COLUMNS.map((column) => (
							<th
								className={`${styles['monitors-table__cell']} ${styles['header-cell']}`}
								key={column.accessor}
							>
								{column.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{monitors.map((monitor) => (
						<MonitorsTableRow key={monitor.id} monitor={monitor} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MonitorsTable;
