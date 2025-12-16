import { TMonitorRange } from '@/types';

interface MonitorRangeButtonItem {
	label: string;
	name: TMonitorRange;
}

export const MONITOR_RANGE_BUTTONS_ITEMS: MonitorRangeButtonItem[] = [
	{
		label: '24h',
		name: '24h',
	},
	{
		label: '7d',
		name: '7d',
	},
	{
		label: '30d',
		name: '30d',
	},
];
