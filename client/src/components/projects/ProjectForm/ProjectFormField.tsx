'use client';

import { FormField, FormLabel, Textarea, TextField } from '@/components/ui';
import { Field } from '@/types';
import { FieldValues } from 'react-hook-form';

interface ProjectFormFieldProps<D extends FieldValues> {
	field: Field<D>;
	isEdit: boolean;
}

export const ProjectFormField = <D extends FieldValues>({
	field,
	isEdit,
}: ProjectFormFieldProps<D>) => {
	return (
		<FormField name={field.name}>
			<FormLabel htmlFor={field.name} isRequired={!isEdit && field.isRequired}>
				{field.label}
			</FormLabel>
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
		</FormField>
	);
};
