import { Field } from '@/types';
import { StatusPageFormDto } from '../../StatusPageForm/StatusPageForm';

export const UPDATE_STATUS_PAGE_FORM_FIELDS: Field<StatusPageFormDto>[] = [
	{
		name: 'title',
		label: 'Title',
		placeholder: 'Title',
		type: 'text',
	},
	{
		name: 'slug',
		label: 'Slug',
		placeholder: 'slug',
		type: 'text',
	},
	{
		name: 'description',
		label: 'Description',
		placeholder: 'Description',
		type: 'textarea',
	},
];
