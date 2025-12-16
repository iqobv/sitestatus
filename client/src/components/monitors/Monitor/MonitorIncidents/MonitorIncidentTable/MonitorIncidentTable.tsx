'use client';

import { Incident } from '../MonitorIncidents.types';
import styles from './MonitorIncidentTable.module.scss';
import { INCIDENT_COLUMNS as COLUMNS } from './monitorIncidentTableColumns';

interface MonitorIncidentTableProps {
	incidents: Incident[];
}

const MonitorIncidentTable = ({ incidents }: MonitorIncidentTableProps) => {
	return (
		<div className={styles['monitor-incident__wrapper']}>
			<table className={styles['incident-table']}>
				<thead className={styles['incident-table__header']}>
					<tr className={styles['incident-table__row']}>
						{COLUMNS.map((column) => (
							<th
								key={column.accessor}
								className={styles['incident-table__cell']}
							>
								{column.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{incidents.map((incident) => (
						<tr
							key={incident.startTime.toISOString()}
							className={styles['incident-table__row']}
						>
							{COLUMNS.map((column) => (
								<td
									key={column.accessor}
									className={styles['incident-table__cell']}
								>
									{column.render(incident)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MonitorIncidentTable;
