'use client';

import { Button, TextField } from '@/components/ui';
import { ApiErrorResponse, Field } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import {
	DefaultValues,
	FieldValues,
	Path,
	useForm,
	UseFormRegister,
} from 'react-hook-form';
import { ZodType } from 'zod';
import styles from './AuthForm.module.scss';
import AuthFormGlobalError from './AuthFormGlobalError/AuthFormGlobalError';
import UserDeletedError from './UserDeletedError/UserDeletedError';
import VerifyEmailButton from './VerifyEmailButton/VerifyEmailButton';

interface AuthFormProps<T extends FieldValues, R> {
	fields: Field<T>[];
	mutationFn: (data: T) => Promise<R>;
	onSuccess?: (data: R) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	schema: ZodType<T, any, any>;
	buttonLabel?: string;
	bottomText?: React.ReactNode;
	defaultValues?: DefaultValues<T>;
	renderExtra?: (
		register: UseFormRegister<T>,
		error?: string,
	) => React.ReactNode;
}

const AuthForm = <T extends FieldValues, R>({
	fields,
	mutationFn,
	buttonLabel,
	onSuccess,
	schema,
	bottomText,
	defaultValues,
	renderExtra,
}: AuthFormProps<T, R>) => {
	const [isUnverified, setIsUnverified] = useState(false);
	const [isUserDeletedError, setIsUserDeletedError] = useState<boolean>(false);

	const resolver = !!schema ? zodResolver(schema) : undefined;

	const {
		register,
		handleSubmit,
		reset,
		setError,
		resetField,
		formState: { errors },
		watch,
	} = useForm<T>({
		resolver,
		defaultValues,
	});

	const { mutate, isPending } = useMutation({
		mutationFn,
		onMutate: () => {
			setIsUserDeletedError(false);
			setError('root', { message: undefined });
			setIsUnverified(false);
		},
		onSuccess(data) {
			reset();
			onSuccess?.(data);
		},
		onError(error) {
			if (isAxiosError(error) && error.response) {
				const apiData = error.response.data as ApiErrorResponse;

				if (apiData.field) {
					setError(apiData.field as Path<T>, {
						message: apiData.message,
					});
				} else {
					if (apiData.code === 'EMAIL_NOT_VERIFIED') {
						setIsUnverified(true);
					}

					if (apiData.code === 'USER_DELETED') {
						setIsUserDeletedError(true);
					}

					setError('root', { message: apiData.message });
					resetField('password' as Path<T>);
				}
			}
		},
	});

	const onSubmit = (data: T) => mutate(data);

	const email = watch('email' as Path<T>);

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			{errors.root?.message && (
				<>
					<AuthFormGlobalError message={errors.root.message} />
					{isUnverified && <VerifyEmailButton email={email} />}
					{isUserDeletedError && <UserDeletedError email={email} />}
				</>
			)}
			<div className={styles.fields}>
				{fields.map(
					({ label, placeholder, type, name, autoComplete, iconLeft }) => {
						return (
							<TextField
								key={name}
								label={label}
								placeholder={placeholder}
								type={type}
								leftIcon={iconLeft ? <>{iconLeft({})}</> : undefined}
								autoComplete={autoComplete}
								error={errors[name]?.message as string}
								{...register(name)}
							/>
						);
					},
				)}
				{renderExtra &&
					renderExtra(
						register,
						errors['acceptTerms' as Path<T>]?.message as string,
					)}
			</div>
			<Button loading={isPending} type="submit" fullWidth>
				{buttonLabel}
			</Button>
			{bottomText && <div className={styles.bottom}>{bottomText}</div>}
		</form>
	);
};

export default AuthForm;
