'use client';

import { SectionHeader, SkeletonLoader } from '@/components/ui';
import styles from './MonitorHeader.module.scss';

const MonitorHeaderLoader = () => {
	return (
		<div className={styles['monitor-header']}>
			<SectionHeader
				title={<SkeletonLoader width={250} borderRadius={10} />}
				description={<SkeletonLoader width={250} borderRadius={10} />}
			/>
			<div className={styles['monitor-header__actions']}>
				<SkeletonLoader
					borderRadius={10}
					height={44}
					width="100%"
					containerClassName={styles['monitor-header__actions--loader']}
				/>
				<SkeletonLoader
					borderRadius={10}
					height={44}
					width="100%"
					containerClassName={styles['monitor-header__actions--loader']}
				/>
			</div>
		</div>
	);
};

export default MonitorHeaderLoader;
