'use client';

import { SkeletonLoader } from '@/components/ui';
import styles from './MonitorRangeButtons.module.scss';

const MonitorRangeButtonsLoader = () => {
	return (
		<div className={styles['monitor-range-buttons']}>
			{Array.from({ length: 3 }).map((_, index) => (
				<SkeletonLoader key={index} height={44} width={70} borderRadius={10} />
			))}
		</div>
	);
};

export default MonitorRangeButtonsLoader;
