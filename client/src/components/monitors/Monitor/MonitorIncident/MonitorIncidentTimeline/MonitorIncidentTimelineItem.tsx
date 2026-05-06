'use client';

import { IconType } from 'react-icons';
import styles from './MonitorIncidentTimeline.module.scss';

interface MonitorIncidentTimelineItemProps {
	children: React.ReactNode;
	icon: IconType;
	timestamp: Date;
}

const MonitorIncidentTimelineItem = ({
	children,
	icon: Icon,
	timestamp,
}: MonitorIncidentTimelineItemProps) => {
	return (
		<div className={styles.timelineEvent}>
			<div className={styles.eventContent}>
				<Icon size={20} />
				<p>{children}</p>
			</div>
			<p className={styles.timestamp}>{timestamp.toLocaleString()}</p>
		</div>
	);
};

export default MonitorIncidentTimelineItem;
