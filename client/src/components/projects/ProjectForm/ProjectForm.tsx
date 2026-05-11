'use client';

import { Form } from '@/components/ui';
import { ApiErrorResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { BaseSyntheticEvent } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { ProjectFormProps } from './ProjectForm.types';
import ProjectFormActions from './ProjectFormActions';
import ProjectFormField from './ProjectFormField';

const ProjectForm = <D extends FieldValues>({
	mutationOptions,
	fields,
	isEdit = false,
	buttonLabel = 'Submit',
	...props
}: ProjectFormProps<D>) => {
	const { mutate, isPending } = useMutation({ ...mutationOptions });

	const handleSubmit = (
		data: D,
		event: BaseSyntheticEvent | undefined,
		methods: UseFormReturn<D>,
	) => {
		mutate(data, {
			onSuccess: (responseData, variables, onMutateResult, context) => {
				methods.reset(data);
				if (mutationOptions.onSuccess) {
					mutationOptions.onSuccess(
						responseData,
						variables,
						onMutateResult,
						context,
					);
				}
			},
			onError: (error) => {
				if (isAxiosError(error) && error.response) {
					const apiData = error.response.data as ApiErrorResponse;
					if (apiData.field) {
						methods.setError(apiData.field as Path<D>, {
							type: 'server',
							message: apiData.message,
						});
					}
				}
			},
		});
	};

	return (
		<Form<D> {...props} onSubmit={handleSubmit}>
			{fields.map((field) => (
				<ProjectFormField key={field.name} field={field} isEdit={isEdit} />
			))}
			<ProjectFormActions
				buttonLabel={buttonLabel}
				isEdit={isEdit}
				isPending={isPending}
			/>
		</Form>
	);
};

export default ProjectForm;
