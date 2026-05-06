'use client';

import { IncidentDetails } from '@/types';
import { Region } from '@/types/region';
import {
	MdCheckCircleOutline,
	MdErrorOutline,
	MdOutlineNotificationsActive,
} from 'react-icons/md';
import MonitorCard from '../../MonitorCard/MonitorCard';
import styles from './MonitorIncidentTimeline.module.scss';
import MonitorIncidentTimelineItem from './MonitorIncidentTimelineItem';
import { useTransformData } from '../useTransformData.hook';

interface MonitorIncidentTimelineProps {
	incidentData: IncidentDetails;
	regionsData: Region[];
}

const RegionName = ({
	incidentData,
	regionsData,
}: MonitorIncidentTimelineProps) => {
	const { transformRegionName } = useTransformData({
		incidentData,
		regionsData,
	});

	return (
		<>
			<strong>{transformRegionName(incidentData.regionId)}</strong> region
		</>
	);
};

const MonitorIncidentTimeline = ({
	incidentData,
	regionsData,
}: MonitorIncidentTimelineProps) => {
	const { transformErrorMessage } = useTransformData({
		incidentData,
		regionsData,
	});

	return (
		<MonitorCard cardTitle="Incident Timeline">
			<div className={styles.container}>
				{incidentData.timeline.map((event, index) => (
					<div key={index} className={styles.timelineEvent}>
						{event.type === 'CREATED' && (
							<MonitorIncidentTimelineItem
								icon={MdErrorOutline}
								timestamp={new Date(event.timestamp)}
							>
								<strong>{transformErrorMessage()}</strong> detected in{' '}
								<RegionName
									incidentData={incidentData}
									regionsData={regionsData}
								/>
								.
							</MonitorIncidentTimelineItem>
						)}
						{event.type === 'ALERTED' && (
							<MonitorIncidentTimelineItem
								icon={MdOutlineNotificationsActive}
								timestamp={new Date(event.timestamp)}
							>
								Alert sent to user
							</MonitorIncidentTimelineItem>
						)}
						{event.type === 'RESOLVED' && (
							<MonitorIncidentTimelineItem
								icon={MdCheckCircleOutline}
								timestamp={new Date(event.timestamp)}
							>
								Incident resolved in{' '}
								<RegionName
									incidentData={incidentData}
									regionsData={regionsData}
								/>
								.
							</MonitorIncidentTimelineItem>
						)}
					</div>
				))}
			</div>
		</MonitorCard>
	);
};

export default MonitorIncidentTimeline;
