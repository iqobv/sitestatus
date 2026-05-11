import { CreateProjectDto } from '@/dto';
import { Field } from '@/types';

export const CREATE_PROJECT_FIELDS: Field<CreateProjectDto>[] = [
	{
		name: 'name',
		label: 'Name',
		placeholder: 'Enter project name',
		isRequired: true,
		type: 'text',
	},
	{
		name: 'description',
		label: 'Description',
		placeholder: 'Enter project description',
		isRequired: false,
		type: 'textarea',
	},
];
