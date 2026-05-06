'use client';

import type { Incident } from '@/types';
import MonitorCard from '../MonitorCard/MonitorCard';
import MonitorIncidentsTable from './MonitorIncidentsTable/MonitorIncidentsTable';

interface MonitorIncidentsProps {
	incidents: Incident[];
}

const MonitorIncidents = ({ incidents }: MonitorIncidentsProps) => {
	return (
		<MonitorCard cardTitle="Incidents">
			{incidents.length === 0 && <p>No incidents to display.</p>}
			{incidents.length > 0 && <MonitorIncidentsTable incidents={incidents} />}
		</MonitorCard>
	);
};

export default MonitorIncidents;
