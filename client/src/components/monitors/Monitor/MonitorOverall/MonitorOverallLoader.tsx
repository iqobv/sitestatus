import { SkeletonLoader } from '@/components/ui';
import styles from './MonitorOverall.module.scss';

const cards = Array.from({ length: 3 }).map((_, i) => (
	<SkeletonLoader key={i} height={95} />
));

const MonitorOverallLoader = () => {
	return <div className={styles['monitor-overall']}>{cards}</div>;
};

export default MonitorOverallLoader;
