import { UpdateProjectDto } from '@/dto/project.dto';
import { Field } from '@/types/ui/field.types';

export const EDIT_PROJECT_FIELDS: Field<UpdateProjectDto>[] = [
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
