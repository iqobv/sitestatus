'use client';

import { Button, TextField } from '@/components/ui';
import { QUERY_KEYS } from '@/config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import styles from './MonitorForm.module.scss';
import { MonitorFormProps } from './MonitorForm.types';
import MonitorFormProject from './MonitorFormProject/MonitorFormProject';
import MonitorFormRegions from './MonitorFormRegions/MonitorFormRegions';

const MonitorForm = <T extends FieldValues, R extends { id: string }>({
	fields,
	mutationFn,
	onSuccess,
	onCancel,
	schema,
	buttonLabel = 'Create Monitor',
	defaultValues,
}: MonitorFormProps<T, R>) => {
	const queryClient = useQueryClient();

	const resolver = !!schema ? zodResolver(schema) : undefined;

	const methods = useForm({
		resolver,
		defaultValues,
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
		setError,
	} = methods;

	useEffect(() => {
		if (defaultValues) reset(defaultValues);
	}, [defaultValues, reset]);

	const { mutate, isPending } = useMutation({
		mutationFn: (data: T) => mutationFn(data),
		gcTime: 0,
		onSuccess(data) {
			reset();
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.monitors.list,
			});
			reset(data);
			onSuccess?.(data);
		},
		onError(error) {
			setError('root', { message: error.message });
		},
	});

	const onSubmit = (data: T) => {
		mutate(data);
	};

	const handleCancel = () => {
		reset();
		onCancel?.();
	};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles['monitor-form']}
			>
				{fields.map((field) => (
					<div key={field.name}>
						{field.type === 'checkbox' ? (
							<div className={styles['checkbox-field']}>
								<input
									id={`${field.name}-checkbox`}
									type="checkbox"
									{...register(field.name)}
								/>
								<label htmlFor={`${field.name}-checkbox`}>{field.label}</label>
							</div>
						) : (
							<TextField
								label={field.label}
								placeholder={field.placeholder}
								error={errors[field.name]?.message as string}
								autoComplete={field.autocomplete}
								type={field.type}
								{...register(field.name)}
							/>
						)}
					</div>
				))}
				<MonitorFormRegions />
				<MonitorFormProject />
				{errors.root && <p className="error-message">{errors.root.message}</p>}
				<div className={styles['form-actions']}>
					<Button
						variant="secondary"
						type="button"
						onClick={handleCancel}
						className="mr-2"
						loading={isPending}
					>
						Cancel
					</Button>
					<Button loading={isPending} type="submit" disabled={!isDirty}>
						{buttonLabel}
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};

export default MonitorForm;
