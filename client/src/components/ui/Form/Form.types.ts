import { BaseSyntheticEvent, ReactNode } from 'react';
import { DefaultValues, FieldValues, UseFormReturn } from 'react-hook-form';
import { ZodType } from 'zod';

export interface FormProps<D extends FieldValues> {
	children: ReactNode | ((methods: UseFormReturn<D>) => ReactNode);
	schema: ZodType<D, any, any>;
	onSubmit?: (
		data: D,
		event: BaseSyntheticEvent | undefined,
		methods: UseFormReturn<D>,
	) => void | Promise<void>;
	defaultValues?: DefaultValues<D>;
}
