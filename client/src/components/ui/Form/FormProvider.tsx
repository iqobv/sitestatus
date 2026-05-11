'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { BaseSyntheticEvent } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { FormProps } from './Form.types';

const Form = <D extends FieldValues = FieldValues>({
	children,
	schema,
	onSubmit,
	defaultValues,
	values,
	className,
}: FormProps<D>) => {
	const methods = useForm<D>({
		resolver: zodResolver(schema),
		defaultValues,
		values,
	});

	return (
		<FormProvider {...methods}>
			<form
				className={className}
				onSubmit={
					onSubmit
						? methods.handleSubmit((data: D, event?: BaseSyntheticEvent) =>
								onSubmit(data, event, methods),
							)
						: undefined
				}
			>
				{typeof children === 'function' ? children(methods) : children}
			</form>
		</FormProvider>
	);
};

export default Form;
