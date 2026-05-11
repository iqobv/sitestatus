'use client';

import { MonitorWithRegions } from '@/types';
import MonitorRangeButtons from './MonitorRangeButtons/MonitorRangeButtons';
import styles from './MonitorRangeControl.module.scss';
import MonitorRefreshTimer from './MonitorRefreshTimer/MonitorRefreshTimer';

interface MonitorRangeControlProps {
	monitor: MonitorWithRegions;
}

const MonitorRangeControl = ({ monitor }: MonitorRangeControlProps) => {
	return (
		<div className={styles.rangeControl}>
			<MonitorRangeButtons />
			<MonitorRefreshTimer monitor={monitor} />
		</div>
	);
};

export default MonitorRangeControl;
