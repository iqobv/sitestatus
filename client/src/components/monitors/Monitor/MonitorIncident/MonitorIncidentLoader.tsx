import { SkeletonLoader } from '@/components/ui';
import styles from './MonitorIncident.module.scss';

const MonitorIncidentLoader = () => {
	return (
		<div className={styles.incidentDetails}>
			<SkeletonLoader height={82} />
			<div className={styles.incidentInfo}>
				{Array.from({ length: 2 }).map((_, index) => (
					<SkeletonLoader key={index} height={82} />
				))}
			</div>
			<SkeletonLoader height={150} />
		</div>
	);
};

export default MonitorIncidentLoader;
