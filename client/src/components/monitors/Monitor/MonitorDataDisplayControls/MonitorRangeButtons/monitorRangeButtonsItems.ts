import { MonitorRange, RangeNumericValue } from '@/types';

interface MonitorRangeButtonItem {
	label: string;
	name: MonitorRange;
	value: RangeNumericValue;
}

export const MONITOR_RANGE_BUTTONS_ITEMS: MonitorRangeButtonItem[] = [
	{
		label: '24h',
		name: '24h',
		value: 1,
	},
	{
		label: '7d',
		name: '7d',
		value: 7,
	},
	{
		label: '30d',
		name: '30d',
		value: 30,
	},
];
