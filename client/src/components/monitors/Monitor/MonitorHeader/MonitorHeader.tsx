import { SectionHeader } from '@/components/ui';
import { Monitor } from '@/types';
import styles from './MonitorHeader.module.scss';
import MonitorHeaderDropdown from './MonitorHeaderDropdown';

interface MonitorHeaderProps {
	monitor: Monitor;
}

const MonitorHeader = ({ monitor }: MonitorHeaderProps) => {
	return (
		<div className={styles['monitor-header']}>
			<SectionHeader title={monitor.name} description={monitor.url} />
			<MonitorHeaderDropdown monitorId={monitor.id} />
		</div>
	);
};

export default MonitorHeader;
