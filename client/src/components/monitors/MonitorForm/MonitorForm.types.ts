import { IField } from '@/types';
import { DefaultValues, FieldValues } from 'react-hook-form';
import { ZodType } from 'zod';

export interface MonitorFormProps<
	T extends FieldValues,
	R extends { id: string }
> {
	fields: IField<T>[];
	mutationFn: (data: T) => Promise<R>;
	onSuccess?: (data: R) => void;
	onCancel?: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	schema?: ZodType<T, any, any>;
	buttonLabel?: string;
	defaultValues?: Partial<T> | DefaultValues<T>;
}
