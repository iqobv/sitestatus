import { CreateMonitorDto } from '@/dto';
import { IField } from '@/types';

export const CREATE_MONITOR_FIELDS: IField<CreateMonitorDto>[] = [
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
		type: 'url',
	},
	{
		name: 'checkIntervalSeconds',
		label: 'Check Interval (minutes)',
		placeholder: 'Enter check interval in minutes',
		type: 'number',
	},
];
