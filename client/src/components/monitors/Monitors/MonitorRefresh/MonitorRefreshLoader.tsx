'use client';

import { SkeletonLoader } from '@/components/ui';
import styles from './MonitorRefresh.module.scss';

export const MonitorRefreshLoader = () => {
	return (
		<div className={styles.header}>
			<SkeletonLoader width={210} height={18} />
			<SkeletonLoader width={122} height={36} />
		</div>
	);
};
