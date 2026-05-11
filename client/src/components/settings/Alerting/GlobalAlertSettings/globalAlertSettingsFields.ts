import { UpsertAlertSettingsDto } from '@/dto';
import { Field } from '@/types';

export const GLOBAL_ALERT_SETTINGS_FIELDS: Field<UpsertAlertSettingsDto>[] = [
	{
		name: 'onDown',
		type: 'checkbox',
		label: 'On Down',
		placeholder: '',
	},
	{
		name: 'onUp',
		type: 'checkbox',
		label: 'On Up',
		placeholder: '',
	},
	{
		name: 'delay',
		type: 'number',
		label: 'Delay (seconds)',
		placeholder: 'Enter delay in seconds',
	},
];
