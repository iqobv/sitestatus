'use client';

import { Form, Textarea, TextField } from '@/components/ui';
import { Field } from '@/types';
import { FieldValues } from 'react-hook-form';

interface ProjectFormFieldProps<D extends FieldValues> {
	field: Field<D>;
	isEdit: boolean;
}

const ProjectFormField = <D extends FieldValues>({
	field,
	isEdit,
}: ProjectFormFieldProps<D>) => {
	return (
		<Form.Field name={field.name}>
			<Form.Label htmlFor={field.name} isRequired={!isEdit && field.isRequired}>
				{field.label}
			</Form.Label>
			{field.type === 'textarea' ? (
				<Textarea
					placeholder={field.placeholder}
					id={field.name}
					maxRows={30}
					maxLength={300}
				/>
			) : (
				<TextField
					placeholder={field.placeholder}
					id={field.name}
					type={field.type}
					required={!isEdit && field.isRequired}
				/>
			)}
		</Form.Field>
	);
};

export default ProjectFormField;
