import styles from './Monitor.module.scss';
import MonitorCardsLoader from './MonitorCards/MonitorCardsLoader';
import MonitorDataDisplayControlsLoader from './MonitorDataDisplayControls/MonitorDataDisplayControlsLoader';
import MonitorHeaderLoader from './MonitorHeader/MonitorHeaderLoader';
import MonitorHeatmapLoader from './MonitorHeatmap/MonitorHeatmapLoader';
import MonitorIncidentsLoader from './MonitorIncidents/MonitorIncidentsLoader';

const MonitorLoader = () => {
	return (
		<div className={styles['monitor__content']}>
			<MonitorHeaderLoader />
			<MonitorDataDisplayControlsLoader />
			<MonitorCardsLoader />
			<MonitorHeatmapLoader />
			<MonitorIncidentsLoader />
		</div>
	);
};

export default MonitorLoader;
