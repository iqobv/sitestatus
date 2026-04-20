'use client';

import { Checkbox, Form, Textarea, TextField } from '@/components/ui';
import { Field } from '@/types';
import { FieldValues, Path } from 'react-hook-form';

interface ProjectFormFieldProps<D extends FieldValues> {
	field: Field<D>;
	isEdit: boolean;
	isAutoSync?: boolean;
}

const ProjectFormField = <D extends FieldValues>({
	field,
	isEdit,
	isAutoSync,
}: ProjectFormFieldProps<D>) => {
	return (
		<div key={String(field.name)}>
			<Form.Field name={field.name}>
				<Form.Label
					htmlFor={String(field.name)}
					isRequired={!isEdit && field.isRequired}
				>
					{field.label}
				</Form.Label>
				{field.type === 'textarea' ? (
					<Textarea
						placeholder={field.placeholder}
						id={String(field.name)}
						maxRows={30}
						maxLength={300}
					/>
				) : (
					<TextField
						placeholder={field.placeholder}
						id={String(field.name)}
						type={field.type}
						readOnly={field.name === 'slug' && !!isAutoSync}
						required={!isEdit && field.isRequired}
					/>
				)}
			</Form.Field>
			{field.name === 'slug' && (
				<Form.Field name={'isAutoSync' as Path<D>}>
					<Checkbox label="Auto-generate slug" />
				</Form.Field>
			)}
		</div>
	);
};

export default ProjectFormField;
