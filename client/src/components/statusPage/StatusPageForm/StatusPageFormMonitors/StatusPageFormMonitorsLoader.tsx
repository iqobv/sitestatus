import { SkeletonLoader } from '@/components/ui';
import styles from './StatusPageFormMonitors.module.scss';

const items = Array.from({ length: 3 }).map((_, i) => (
	<SkeletonLoader key={i} height={86} />
));

const StatusPageFormMonitorsLoader = () => {
	return (
		<div className={styles.monitorsWrapper}>
			<SkeletonLoader width={150} height={28} />
			<div className={styles.monitorsList}>{items}</div>
			<SkeletonLoader width={130} height={44} />
		</div>
	);
};

export default StatusPageFormMonitorsLoader;
