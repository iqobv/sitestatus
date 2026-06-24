import { MonitorRangeButtonsLoader } from './MonitorRangeButtons/MonitorRangeButtonsLoader';
import styles from './MonitorRangeControl.module.scss';
import { MonitorRefreshTimerLoader } from './MonitorRefreshTimer/MonitorRefreshTimerLoader';

export const MonitorRangeControlLoader = () => {
	return (
		<div className={styles.rangeControl}>
			<MonitorRangeButtonsLoader />
			<MonitorRefreshTimerLoader />
		</div>
	);
};
