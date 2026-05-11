import { FormProps } from '@/components/ui';
import { Field } from '@/types';
import { FieldValues } from 'react-hook-form';

export interface MonitorFormProps<
	D extends FieldValues,
	R extends { id: string },
> extends Omit<FormProps<D>, 'children'> {
	fields: Field<D>[];
	buttonLabel?: string;
	isLoading?: boolean;
}
