import { UpdateMonitorDto } from '@/dto/monitor.dto';
import { Field } from '@/types/ui/field.types';
import { methodOptions } from '../CreateMonitor/createMonitorFields';

export const UPDATE_MONITOR_FIELDS: Field<UpdateMonitorDto>[] = [
	{
		name: 'name',
		label: 'Monitor Name',
		placeholder: 'Enter monitor name',
		type: 'text',
	},
	{
		name: 'method',
		label: 'HTTP Method',
		placeholder: 'Select HTTP method',
		type: 'select',
		options: methodOptions,
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
