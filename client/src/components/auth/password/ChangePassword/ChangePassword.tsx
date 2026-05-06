'use client';

import { changePassword } from '@/api';
import { Form, TextField } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { ChangePasswordDto } from '@/dto';
import { changePasswordSchema } from '@/schemas';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AuthWrapper from '../../AuthWrapper/AuthWrapper';
import { CHANGE_PASSWORD_FIELDS } from './changePasswordFields';

interface ApiErrorResponse {
	code?: string;
	message?: string;
}

const ChangePassword = () => {
	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationFn: (data: ChangePasswordDto) => changePassword(data),
	});

	return (
		<AuthWrapper showSocialButtons={false} header={<h2>Change Password</h2>}>
			<Form<ChangePasswordDto>
				schema={changePasswordSchema}
				defaultValues={{
					oldPassword: '',
					newPassword: '',
					newPasswordConfirm: '',
				}}
				onSubmit={(data, event, methods) => {
					mutate(data, {
						onSuccess: () => {
							toast.success('Password changed successfully');
							router.push(PRIVATE_PAGES.SETTINGS.SECURITY);
						},
						onError: (error) => {
							const e = error as AxiosError<ApiErrorResponse>;
							const errorCode = e.code || e.response?.data?.code;
							const errorMessage =
								e.response?.data?.message ||
								e.message ||
								'An error occurred while changing password';

							if (errorCode === 'OLD_PASSWORD_INCORRECT') {
								methods.reset();
								methods.setError('oldPassword', {
									type: 'manual',
									message: errorMessage,
								});
							} else {
								toast.error(errorMessage);
							}
						},
					});
				}}
			>
				{({ formState: { errors }, setError }) => (
					<>
						{CHANGE_PASSWORD_FIELDS.map(
							({ name, iconLeft, isRequired, ...rest }) => {
								const Icon = iconLeft;
								const error = errors[name]?.message as string | undefined;

								return (
									<Form.Field key={name} name={name}>
										<TextField
											leftIcon={Icon ? <Icon /> : undefined}
											required={isRequired}
											error={error}
											{...rest}
										/>
									</Form.Field>
								);
							},
						)}
						<Form.Submit buttonProps={{ fullWidth: true, loading: isPending }}>
							Change Password
						</Form.Submit>
					</>
				)}
			</Form>
		</AuthWrapper>
	);
};

export default ChangePassword;
