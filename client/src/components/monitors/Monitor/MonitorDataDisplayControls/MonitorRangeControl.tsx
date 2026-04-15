'use client';

import { MonitorFull } from '@/types';
import MonitorRangeButtons from './MonitorRangeButtons/MonitorRangeButtons';
import styles from './MonitorRangeControl.module.scss';
import MonitorRefreshTimer from './MonitorRefreshTimer/MonitorRefreshTimer';

interface MonitorRangeControlProps {
	monitor: MonitorFull;
}

const MonitorRangeControl = ({ monitor }: MonitorRangeControlProps) => {
	return (
		<div className={styles['range-control']}>
			<MonitorRangeButtons />
			<MonitorRefreshTimer monitor={monitor} />
		</div>
	);
};

export default MonitorRangeControl;
