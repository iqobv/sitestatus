'use client';

import { MonitorTimeline } from '@/types';
import styles from './MonitorOverallUptimeBar.module.scss';
import MonitorOverallUptimeBarItem from './MonitorOverallUptimeBarItem';

interface MonitorOverallUptimeBarProps {
	timeline: MonitorTimeline[];
}

const MonitorOverallUptimeBar = ({
	timeline,
}: MonitorOverallUptimeBarProps) => {
	return (
		<div className={styles['monitor-overall-uptime-bar']}>
			{timeline.map((entry, index) => (
				<MonitorOverallUptimeBarItem key={index} entry={entry} />
			))}
		</div>
	);
};

export default MonitorOverallUptimeBar;
