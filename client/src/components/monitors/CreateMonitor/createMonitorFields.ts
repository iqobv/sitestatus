import { CreateMonitorDto } from '@/dto/monitor.dto';
import { MonitorMethod } from '@/types/monitors/monitorMethod.types';
import { Field } from '@/types/ui/field.types';
import { Option } from '@/types/ui/option.types';

export const methodOptions: Option<MonitorMethod>[] = [
	{
		label: 'GET',
		value: MonitorMethod.GET,
	},
	{
		label: 'OPTIONS',
		value: MonitorMethod.OPTIONS,
	},
];

export const CREATE_MONITOR_FIELDS: Field<CreateMonitorDto>[] = [
	{
		name: 'name',
		label: 'Monitor Name',
		placeholder: 'Enter monitor name',
		isRequired: true,
		type: 'text',
	},
	{
		name: 'method',
		label: 'HTTP Method',
		placeholder: 'Select HTTP method',
		type: 'select',
		isRequired: true,
		options: methodOptions,
	},
	{
		name: 'url',
		label: 'Monitor URL',
		placeholder: 'Enter monitor URL',
		isRequired: true,
		type: 'url',
	},
	{
		name: 'checkIntervalSeconds',
		label: 'Check Interval (seconds)',
		placeholder: 'Enter check interval in seconds',
		isRequired: true,
		type: 'number',
	},
];
