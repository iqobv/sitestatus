import styles from './MonitorRegionStats.module.scss';

import { SkeletonLoader } from '@/components/ui';

const cards = Array.from({ length: 3 }).map((_, i) => (
	<SkeletonLoader key={i} height={82} />
));

export const MonitorRegionStatsLoader = () => {
	return <div className={styles.stats}>{cards}</div>;
};
