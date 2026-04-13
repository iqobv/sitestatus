'use client';

import MonitorRangeButtons from './MonitorRangeButtons/MonitorRangeButtons';
import styles from './MonitorRangeControl.module.scss';
import MonitorRefreshTimer from './MonitorRefreshTimer/MonitorRefreshTimer';

interface MonitorRangeControlProps {
	monitorId: string;
}

const MonitorRangeControl = ({ monitorId }: MonitorRangeControlProps) => {
	return (
		<div className={styles['range-control']}>
			<MonitorRangeButtons />
			<MonitorRefreshTimer monitorId={monitorId} />
		</div>
	);
};

export default MonitorRangeControl;
