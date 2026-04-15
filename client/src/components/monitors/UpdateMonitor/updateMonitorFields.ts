import { UpdateMonitorDto } from '@/dto';
import { Field } from '@/types';

export const UPDATE_MONITOR_FIELDS: Field<UpdateMonitorDto>[] = [
	{
		name: 'name',
		label: 'Monitor Name',
		placeholder: 'Enter monitor name',
		type: 'text',
	},
	{
		name: 'url',
		label: 'Monitor URL',
		placeholder: 'Enter monitor URL',
		type: 'text',
	},
	{
		name: 'checkIntervalSeconds',
		label: 'Check Interval (seconds)',
		placeholder: 'Enter check interval in seconds',
		type: 'number',
	},
];
