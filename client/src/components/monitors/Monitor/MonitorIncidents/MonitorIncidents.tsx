'use client';

import { MonitorRange, MonitorWithPingResults } from '@/types';
import MonitorCard from '../MonitorCard/MonitorCard';
import MonitorIncidentTable from './MonitorIncidentTable/MonitorIncidentTable';
import { useMonitorIncidentList } from './useMonitorIncidents.hook';

interface MonitorIncidentsProps {
	monitor: MonitorWithPingResults;
	selectedRange: MonitorRange;
}

const MonitorIncidents = ({
	monitor,
	selectedRange,
}: MonitorIncidentsProps) => {
	const { incidents } = useMonitorIncidentList({ monitor });

	return (
		<MonitorCard
			cardTitle={`Monitor Incidents (${incidents.length})`}
			tooltip="This table lists all incidents (downtime events) for the selected monitor within the specified range. An incident is recorded when the monitor experiences downtime."
		>
			{incidents.length === 0 ? (
				<p>No incidents found for the selected range ({selectedRange}).</p>
			) : (
				<MonitorIncidentTable incidents={incidents} />
			)}
		</MonitorCard>
	);
};

export default MonitorIncidents;
