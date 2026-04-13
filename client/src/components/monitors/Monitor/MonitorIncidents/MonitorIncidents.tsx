'use client';

import type { MonitorIncident as MonitorIncidentType } from '@/types';
import MonitorCard from '../MonitorCard/MonitorCard';
import MonitorIncidentsTable from './MonitorIncidentsTable/MonitorIncidentsTable';

interface MonitorIncidentsProps {
	incidents: MonitorIncidentType[];
}

const MonitorIncidents = ({ incidents }: MonitorIncidentsProps) => {
	return (
		<MonitorCard cardTitle="Accidents">
			{incidents.length === 0 && <p>No incidents to display.</p>}
			{incidents.length > 0 && <MonitorIncidentsTable incidents={incidents} />}
		</MonitorCard>
	);
};

export default MonitorIncidents;
