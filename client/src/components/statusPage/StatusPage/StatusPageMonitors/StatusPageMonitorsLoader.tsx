import StatusPageMonitorLoader from './StatusPageMonitor/StatusPageMonitorLoader';
import styles from './StatusPageMonitors.module.scss';

const items = Array.from({ length: 4 }).map((_, i) => (
	<StatusPageMonitorLoader key={i} />
));

const StatusPageMonitorsLoader = () => {
	return <div className={styles.monitors}>{items}</div>;
};

export default StatusPageMonitorsLoader;
