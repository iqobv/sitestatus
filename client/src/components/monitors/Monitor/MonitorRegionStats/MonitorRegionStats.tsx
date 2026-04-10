'use client';

import { MonitorAnalytics } from '@/types';
import styles from './MonitorRegionStats.module.scss';
import MonitorRegionStatsCards from './MonitorRegionStatsCards/MonitorRegionStatsCards';

interface MonitorRegionStatsProps {
	data: MonitorAnalytics;
}

const MonitorRegionStats = ({ data }: MonitorRegionStatsProps) => {
	return (
		<div className={styles['region-stats']}>
			<MonitorRegionStatsCards data={data} />
		</div>
	);
};

export default MonitorRegionStats;
