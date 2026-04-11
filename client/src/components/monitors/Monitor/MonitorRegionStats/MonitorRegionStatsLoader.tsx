import styles from './MonitorRegionStats.module.scss';

import { SkeletonLoader } from '@/components/ui';

const cards = Array.from({ length: 3 }).map((_, i) => (
	<SkeletonLoader key={i} height={82} />
));

const MonitorRegionStatsLoader = () => {
	return <div className={styles['monitor-region-stats-cards']}>{cards}</div>;
};

export default MonitorRegionStatsLoader;
