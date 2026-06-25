'use client';

import { getIncidentDetails } from '@/api/incident/incidentDetails.api';
import { getAllRegions } from '@/api/region/region.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useTransformSecondsToHours } from '@/hooks/useTransformSecondsToHours.hook';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { MonitorCard } from '../MonitorCard/MonitorCard';
import { MonitorIncidentStatus } from '../MonitorIncidents/MonitorIncidentStatus/MonitorIncidentStatus';
import styles from './MonitorIncident.module.scss';
import { MonitorIncidentLoader } from './MonitorIncidentLoader';
import { MonitorIncidentTimeline } from './MonitorIncidentTimeline/MonitorIncidentTimeline';
import { useTransformData } from './useTransformData.hook';

export const MonitorIncident = () => {
	const { id: monitorId, incidentId } = useParams<{
		id: string;
		incidentId: string;
	}>();

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.monitors.incident(monitorId, incidentId),
		queryFn: () => getIncidentDetails(monitorId, incidentId),
		enabled: !!monitorId && !!incidentId,
	});

	const { data: regionsData, isLoading: isRegionsLoading } = useQuery({
		queryKey: QUERY_KEYS.regions.lists(),
		queryFn: getAllRegions,
	});

	const { transformErrorMessage, transformRegionName } = useTransformData({
		incidentData: data!,
		regionsData: regionsData || [],
	});

	const duration =
		data && data.resolvedAt
			? new Date(data.resolvedAt!).getTime() -
				new Date(data.createdAt).getTime()
			: null;

	if (isLoading || isRegionsLoading) return <MonitorIncidentLoader />;
	if (!regionsData || !data) return null;

	return (
		<div className={styles.incidentDetails}>
			<MonitorCard cardTitle="Error Information">
				<p>
					<strong>{transformErrorMessage()}</strong> in{' '}
					<strong>{transformRegionName(data.regionId)}</strong> region
				</p>
			</MonitorCard>
			<div className={styles.incidentInfo}>
				<MonitorCard cardTitle="Incident Status">
					<MonitorIncidentStatus isResolved={data.resolved} />
				</MonitorCard>
				<MonitorCard cardTitle="Incident Duration">
					{duration !== null
						? useTransformSecondsToHours(duration / 1000)
						: '-'}
				</MonitorCard>
			</div>
			<MonitorIncidentTimeline incidentData={data} regionsData={regionsData} />
		</div>
	);
};
