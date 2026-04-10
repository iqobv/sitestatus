'use client';

import { Button, ButtonGroup } from '@/components/ui';
import { URL_TO_RANGE_MAP } from '@/constants';
import { monitorRangeParser } from '@/parsers';
import { RangeNumericValue } from '@/types';
import { useQueryState } from 'nuqs';
import styles from './MonitorRangeButtons.module.scss';
import { MONITOR_RANGE_BUTTONS_ITEMS } from './monitorRangeButtonsItems';

const MonitorRangeButtons = () => {
	const [range, setRange] = useQueryState(
		'range',
		monitorRangeParser.withDefault(1),
	);

	const handleRangeChange = (newRange: RangeNumericValue) => {
		setRange(newRange).catch(console.error);
	};

	return (
		<ButtonGroup padding={0}>
			{MONITOR_RANGE_BUTTONS_ITEMS.map((item) => (
				<Button
					key={item.name}
					onClick={() => handleRangeChange(item.value)}
					variant={range === URL_TO_RANGE_MAP[item.name] ? 'contained' : 'text'}
					className={styles['monitor-range-button']}
				>
					{item.label}
				</Button>
			))}
		</ButtonGroup>
	);
};

export default MonitorRangeButtons;
