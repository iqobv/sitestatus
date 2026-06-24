import styles from './Monitor.module.scss';
import { MonitorAnalyticsLoader } from './MonitorAnalyticsLoader';
import { MonitorRangeControlLoader } from './MonitorDataDisplayControls/MonitorRangeControlLoader';
import { MonitorHeaderLoader } from './MonitorHeader/MonitorHeaderLoader';
import { MonitorOverallLoader } from './MonitorOverall/MonitorOverallLoader';
import { MonitorRegionControlLoader } from './MonitorRegionControl/MonitorRegionControlLoader';

export const MonitorLoader = () => {
	return (
		<div className={styles.content}>
			<MonitorHeaderLoader />
			<MonitorRangeControlLoader />
			<MonitorOverallLoader />
			<MonitorRegionControlLoader />
			<MonitorAnalyticsLoader />
		</div>
	);
};
