'use client';

import { TMonitorRange } from '@/types';
import styles from './MonitorDataDisplayControls.module.scss';
import MonitorRangeButtons from './MonitorRangeButtons/MonitorRangeButtons';
import MonitorRefreshTimer from './MonitorRefreshTimer/MonitorRefreshTimer';

interface MonitorDataDisplayControlsProps {
	selectedRange: TMonitorRange;
	monitorId: string;
	onRangeChange: (range: TMonitorRange) => void;
}

const MonitorDataDisplayControls = ({
	selectedRange,
	monitorId,
	onRangeChange,
}: MonitorDataDisplayControlsProps) => {
	return (
		<div className={`${styles['data-display-controls']}`}>
			<MonitorRangeButtons
				selectedRange={selectedRange}
				onRangeChange={onRangeChange}
			/>
			<MonitorRefreshTimer monitorId={monitorId} />
		</div>
	);
};

export default MonitorDataDisplayControls;
