import styles from './StatusPage.module.scss';
import { StatusPageHeaderLoader } from './StatusPageHeader/StatusPageHeaderLoader';
import { StatusPageMonitorsLoader } from './StatusPageMonitors/StatusPageMonitorsLoader';

export const StatusPageLoader = () => {
	return (
		<div className={styles.statusPage}>
			<StatusPageHeaderLoader />
			<StatusPageMonitorsLoader />
		</div>
	);
};
