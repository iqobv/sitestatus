'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { BaseSyntheticEvent, useEffect } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import styles from './Form.module.scss';
import { FormProps } from './Form.types';

const Form = <D extends FieldValues = FieldValues>({
	children,
	schema,
	onSubmit,
	defaultValues,
}: FormProps<D>) => {
	const methods = useForm<D>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	useEffect(() => {
		if (defaultValues) {
			methods.reset(defaultValues);
		}
	}, [defaultValues]);

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={
					onSubmit
						? methods.handleSubmit((data: D, event?: BaseSyntheticEvent) =>
								onSubmit(data, event, methods),
							)
						: undefined
				}
				className={styles.form}
			>
				{typeof children === 'function' ? children(methods) : children}
			</form>
		</FormProvider>
	);
};

export default Form;
