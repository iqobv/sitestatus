'use client';

import { Button, TextField } from '@/components/ui';
import { IField } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { DefaultValues, FieldValues, Path, useForm } from 'react-hook-form';
import { ZodType } from 'zod';
import styles from './AuthForm.module.scss';

interface AuthFormProps<T extends FieldValues, R> {
	fields: IField<T>[];
	mutationFn: (data: T) => Promise<R>;
	onSuccess?: (data: R) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	schema?: ZodType<T, any, any>;
	buttonLabel?: string;
	bottomText?: React.ReactNode;
	defaultValues?: DefaultValues<T>;
}

const AuthForm = <T extends FieldValues, R>({
	fields,
	mutationFn,
	buttonLabel,
	onSuccess,
	schema,
	bottomText,
	defaultValues,
}: AuthFormProps<T, R>) => {
	const resolver = !!schema ? zodResolver(schema) : undefined;

	const {
		register,
		handleSubmit,
		reset,
		setError,
		resetField,
		formState: { errors },
	} = useForm<T>({
		resolver,
		defaultValues,
	});

	const { mutate, isPending } = useMutation({
		mutationFn,
		onSuccess(data) {
			reset();
			onSuccess?.(data);
		},
		onError(error) {
			setError('root', { message: error.message });
			resetField('password' as Path<T>);
		},
	});

	const onSubmit = (data: T) => mutate(data);

	return (
		<form className={styles['auth-form']} onSubmit={handleSubmit(onSubmit)}>
			{errors.root?.message && <p>{errors.root.message}</p>}
			{fields.map(
				({ label, placeholder, type, name, autocomplete, iconLeft }) => {
					return (
						<TextField
							key={name}
							label={label}
							placeholder={placeholder}
							type={type}
							leftIcon={iconLeft ? <>{iconLeft({})}</> : undefined}
							autoComplete={autocomplete}
							error={errors[name]?.message as string}
							{...register(name)}
						/>
					);
				}
			)}
			<Button loading={isPending} type="submit" fullWidth>
				{buttonLabel}
			</Button>
			{bottomText && <div className={styles['bottom-text']}>{bottomText}</div>}
		</form>
	);
};

export default AuthForm;
