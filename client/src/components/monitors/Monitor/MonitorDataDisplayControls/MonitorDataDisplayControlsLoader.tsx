import styles from './MonitorDataDisplayControls.module.scss';
import MonitorRangeButtonsLoader from './MonitorRangeButtons/MonitorRangeButtonsLoader';
import MonitorRefreshTimerLoader from './MonitorRefreshTimer/MonitorRefreshTimerLoader';

const MonitorDataDisplayControlsLoader = () => {
	return (
		<div className={`${styles['data-display-controls']}`}>
			<MonitorRangeButtonsLoader />
			<MonitorRefreshTimerLoader />
		</div>
	);
};

export default MonitorDataDisplayControlsLoader;
