'use client';

import { MonitorAnalytics } from '@/types';
import MonitorCard from '../MonitorCard/MonitorCard';
import styles from './MonitorRegionStats.module.scss';
import { MONITOR_REGIONS_STATS_CARDS } from './monitorRegionStatsCards';

interface MonitorRegionStatsProps {
	data: MonitorAnalytics;
}

const MonitorRegionStats = ({ data }: MonitorRegionStatsProps) => {
	return (
		<div className={styles['monitor-region-stats-cards']}>
			{MONITOR_REGIONS_STATS_CARDS.map(({ title, tooltip, render }, index) => (
				<MonitorCard key={index} cardTitle={title} tooltip={tooltip}>
					{render(data)}
				</MonitorCard>
			))}
		</div>
	);
};

export default MonitorRegionStats;
