'use client';

import { IMonitorWithPingResults } from '@/types';
import styles from './Monitor.module.scss';
import MonitorCards from './MonitorCards/MonitorCards';
import MonitorDataDisplayControls from './MonitorDataDisplayControls/MonitorDataDisplayControls';
import MonitorHeader from './MonitorHeader/MonitorHeader';
import MonitorHeatmap from './MonitorHeatmap/MonitorHeatmap';
import MonitorIncidentList from './MonitorIncidents/MonitorIncidents';
import MonitorLoader from './MonitorLoader';
import { useMonitor } from './useMonitor';

interface MonitorProps {
	id: string;
	initialData?: IMonitorWithPingResults | null;
}

const Monitor = ({ id, initialData }: MonitorProps) => {
	const {
		isLoading,
		isFetching,
		data,
		monitor,
		selectedRange,
		setSelectedRange,
	} = useMonitor({ id, initialData });

	return (
		<div className={styles['monitor']}>
			{isFetching && <MonitorLoader />}
			{!isLoading && data && monitor && (
				<div className={`${styles['monitor__content']} fade`}>
					<MonitorHeader monitor={monitor} />
					<MonitorDataDisplayControls
						selectedRange={selectedRange}
						monitorId={monitor.id}
						onRangeChange={setSelectedRange}
					/>
					<MonitorCards monitor={monitor} />
					<MonitorHeatmap monitor={monitor} selectedRange={selectedRange} />
					<MonitorIncidentList
						monitor={monitor}
						selectedRange={selectedRange}
					/>
				</div>
			)}
		</div>
	);
};

export default Monitor;
