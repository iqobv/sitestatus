import { UptimeStatus } from '@/components/ui';
import { Incident } from '../MonitorIncidents.types';

import styles from './MonitorIncidentTable.module.scss';

interface IncidentColumn {
	header: string;
	accessor: Partial<keyof Incident>;
	render: (incident: Incident) => React.ReactNode;
}

export const INCIDENT_COLUMNS: IncidentColumn[] = [
	{
		header: 'Start',
		accessor: 'startTime',
		render: (incident) => <>{incident.startTime.toLocaleString()}</>,
	},
	{
		header: 'End',
		accessor: 'endTime',
		render: (incident) =>
			incident.endTime ? <>{incident.endTime.toLocaleString()}</> : <>-</>,
	},
	{
		header: 'Duration',
		accessor: 'durationMs',
		render: (incident) => {
			const durationMs = incident.durationMs ?? 0;
			const durationMinutes = Math.round(durationMs / 60000);
			return <>{durationMinutes}m</>;
		},
	},
	{
		header: 'Status',
		accessor: 'status',
		render: (incident) => (
			<UptimeStatus
				textClassName={styles['incident-table__status']}
				status={incident.status}
			/>
		),
	},
];
