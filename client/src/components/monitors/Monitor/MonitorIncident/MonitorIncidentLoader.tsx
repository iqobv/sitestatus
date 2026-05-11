import { SkeletonLoader } from '@/components/ui';
import styles from './MonitorIncident.module.scss';
import MonitorIncidentTimelineLoader from './MonitorIncidentTimeline/MonitorIncidentTimelineLoader';

const MonitorIncidentLoader = () => {
	return (
		<div className={styles.incidentDetails}>
			<SkeletonLoader height={82} />
			<div className={styles.incidentInfo}>
				{Array.from({ length: 2 }).map((_, index) => (
					<SkeletonLoader key={index} height={82} />
				))}
			</div>
			<MonitorIncidentTimelineLoader />
		</div>
	);
};

export default MonitorIncidentLoader;
