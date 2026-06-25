import { FormProps } from '@/components/ui';
import { ApiErrorResponse } from '@/types/api/messageResponse.api';
import { Project } from '@/types/project/project.types';
import { Field } from '@/types/ui/field.types';
import { UseMutationOptions } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';

export interface ProjectFormProps<D extends FieldValues> extends Omit<
	FormProps<D>,
	'children' | 'onSubmit'
> {
	mutationOptions: UseMutationOptions<Project, ApiErrorResponse, D, unknown>;
	fields: Field<D>[];
	isEdit?: boolean;
	buttonLabel?: string;
}
