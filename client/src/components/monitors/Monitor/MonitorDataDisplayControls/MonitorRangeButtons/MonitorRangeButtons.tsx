'use client';

import { Button } from '@/components/ui';
import { TMonitorRange } from '@/types';
import styles from './MonitorRangeButtons.module.scss';
import { MONITOR_RANGE_BUTTONS_ITEMS } from './monitorRangeButtonsItems';

interface MonitorRangeButtonsProps {
	selectedRange: TMonitorRange;
	onRangeChange: (range: TMonitorRange) => void;
}

const MonitorRangeButtons = ({
	selectedRange,
	onRangeChange,
}: MonitorRangeButtonsProps) => {
	return (
		<div className={styles['monitor-range-buttons']}>
			{MONITOR_RANGE_BUTTONS_ITEMS.map((item) => (
				<Button
					key={item.name}
					onClick={() => onRangeChange(item.name)}
					variant={selectedRange === item.name ? 'contained' : 'outlined'}
				>
					{item.label}
				</Button>
			))}
		</div>
	);
};

export default MonitorRangeButtons;
