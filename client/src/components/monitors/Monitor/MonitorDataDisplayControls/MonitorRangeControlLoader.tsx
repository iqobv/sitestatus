import MonitorRangeButtonsLoader from './MonitorRangeButtons/MonitorRangeButtonsLoader';
import styles from './MonitorRangeControl.module.scss';
import MonitorRefreshTimerLoader from './MonitorRefreshTimer/MonitorRefreshTimerLoader';

const MonitorRangeControlLoader = () => {
	return (
		<div className={styles['range-control']}>
			<MonitorRangeButtonsLoader />
			<MonitorRefreshTimerLoader />
		</div>
	);
};

export default MonitorRangeControlLoader;
