import { SectionHeader } from '@/components/ui';
import { MonitorFull } from '@/types';
import styles from './MonitorHeader.module.scss';
import MonitorHeaderDropdown from './MonitorHeaderDropdown';

interface MonitorHeaderProps {
	monitor: MonitorFull;
}

const MonitorHeader = ({ monitor }: MonitorHeaderProps) => {
	return (
		<div className={styles['monitor-header']}>
			<SectionHeader
				title={`${monitor.name}${monitor.isActive ? '' : ' (Paused)'}`}
				description={monitor.url}
			/>
			<MonitorHeaderDropdown monitor={monitor} />
		</div>
	);
};

export default MonitorHeader;
