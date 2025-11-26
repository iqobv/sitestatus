'use client';

import { SkeletonLoader } from '@/components/ui';
import styles from './MonitorRefresh.module.scss';

const MonitorRefreshLoader = () => {
	return (
		<div className={styles['monitors__header']}>
			<SkeletonLoader width={210} height={18} />
			<SkeletonLoader width={122} height={36} />
		</div>
	);
};

export default MonitorRefreshLoader;
