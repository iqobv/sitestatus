import { SkeletonLoader } from '@/components/ui';
import styles from '../MonitorForm/MonitorForm.module.scss';
import MonitorFormRegionsLoader from '../MonitorForm/MonitorFormRegions/MonitorFormRegionsLoader';
import { UPDATE_MONITOR_FIELDS } from './updateMonitorFields';

const fields = Array.from({ length: UPDATE_MONITOR_FIELDS.length }).map(
	(_, i) => <SkeletonLoader key={i} height={78} />,
);

const UpdateMonitorLoader = () => {
	return (
		<div className={styles['monitor-form']}>
			{fields}
			<MonitorFormRegionsLoader />
		</div>
	);
};

export default UpdateMonitorLoader;
