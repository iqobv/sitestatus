'use client';

import { SkeletonLoader } from '@/components/ui';
import styles from './MonitorRefreshTimer.module.scss';

const MonitorRefreshTimerLoader = () => {
	return (
		<div className={styles['refresh-timer']}>
			<SkeletonLoader width={135} height={18} />
			<SkeletonLoader width={100} height={18} />
		</div>
	);
};

export default MonitorRefreshTimerLoader;
