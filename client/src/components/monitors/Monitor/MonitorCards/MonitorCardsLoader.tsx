'use client';

import { SkeletonLoader } from '@/components/ui';
import styles from './MonitorCards.module.scss';

const MonitorCardsLoader = () => {
	return (
		<div className={styles['monitor-cards']}>
			{Array.from({ length: 6 }).map((_, index) => (
				<SkeletonLoader key={index} height={82} borderRadius={8} />
			))}
		</div>
	);
};

export default MonitorCardsLoader;
