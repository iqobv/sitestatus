import styles from './Monitor.module.scss';
import MonitorCardsLoader from './MonitorCards/MonitorCardsLoader';
import MonitorRangeControlLoader from './MonitorDataDisplayControls/MonitorRangeControlLoader';
import MonitorHeaderLoader from './MonitorHeader/MonitorHeaderLoader';
import MonitorHeatmapLoader from './MonitorHeatmap/MonitorHeatmapLoader';
import MonitorIncidentsLoader from './MonitorIncidents/MonitorIncidentsLoader';
import MonitorOverallLoader from './MonitorOverall/MonitorOverallLoader';

const MonitorLoader = () => {
	return (
		<div className={styles['monitor__content']}>
			<MonitorHeaderLoader />
			<MonitorRangeControlLoader />
			<MonitorOverallLoader />
			<MonitorCardsLoader />
			<MonitorHeatmapLoader />
			<MonitorIncidentsLoader />
		</div>
	);
};

export default MonitorLoader;
