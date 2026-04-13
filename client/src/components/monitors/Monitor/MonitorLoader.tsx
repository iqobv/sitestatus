import styles from './Monitor.module.scss';
import MonitorAnalyticsLoader from './MonitorAnalyticsLoader';
import MonitorRangeControlLoader from './MonitorDataDisplayControls/MonitorRangeControlLoader';
import MonitorHeaderLoader from './MonitorHeader/MonitorHeaderLoader';
import MonitorOverallLoader from './MonitorOverall/MonitorOverallLoader';
import MonitorRegionControlLoader from './MonitorRegionControl/MonitorRegionControlLoader';

const MonitorLoader = () => {
	return (
		<div className={styles['monitor__content']}>
			<MonitorHeaderLoader />
			<MonitorRangeControlLoader />
			<MonitorOverallLoader />
			<MonitorRegionControlLoader />
			<MonitorAnalyticsLoader />
		</div>
	);
};

export default MonitorLoader;
