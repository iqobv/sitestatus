'use client';

import { MonitorWithPingResults } from '@/types';
import { useEffect, useState } from 'react';
import { Incident } from './MonitorIncidents.types';

interface UseMonitorIncidentListProps {
	monitor: MonitorWithPingResults;
}

export const useMonitorIncidentList = ({
	monitor,
}: UseMonitorIncidentListProps) => {
	const [incidents, setIncidents] = useState<Incident[]>([]);

	useEffect(() => {
		if (monitor && monitor.pingResults.length > 0) {
			const sorted = [...monitor.pingResults].sort(
				(a, b) =>
					new Date(a.checkedAt).getTime() - new Date(b.checkedAt).getTime(),
			);

			const incidents: Incident[] = [];
			let currentIncident: Incident | null = null;

			for (const ping of sorted) {
				const date = new Date(ping.checkedAt);

				if (ping.status === 'DOWN' || ping.status === 'UNKNOWN') {
					if (!currentIncident) {
						currentIncident = {
							startTime: date,
							endTime: null,
							durationMs: null,
							status: ping.status,
						};
					}
					continue;
				}

				if (ping.status === 'UP') {
					if (currentIncident) {
						currentIncident.endTime = date;
						currentIncident.durationMs =
							date.getTime() - currentIncident.startTime.getTime();

						incidents.push(currentIncident);
						currentIncident = null;
					}
				}
			}

			if (currentIncident) {
				incidents.push(currentIncident);
			}

			// eslint-disable-next-line react-hooks/set-state-in-effect
			setIncidents(incidents);
		}
	}, [monitor]);

	return { incidents };
};
