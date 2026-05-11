'use client';

import { resetPassword } from '@/api';
import { Form, TextField } from '@/components/ui';
import { AUTH_PAGES } from '@/config';
import { ResetPasswordDto } from '@/dto';
import { resetPasswordSchema } from '@/schemas';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { parseAsString, useQueryState } from 'nuqs';
import { toast } from 'react-toastify';
import AuthWrapper from '../../AuthWrapper/AuthWrapper';
import { RESET_PASSWORD_FORM_FIELDS } from './resetPasswordFields';

const ResetPassword = () => {
	const router = useRouter();

	const [token] = useQueryState('token', parseAsString);

	const { mutate, isPending } = useMutation({
		mutationFn: (data: ResetPasswordDto) => resetPassword(token!, data),
		onSuccess: (data) => {
			if (data.code === 'RESET_PASSWORD') {
				toast.success(
					data.message ||
						'Password reset successfully. You can now log in with your new password.',
				);
				router.push(AUTH_PAGES.LOGIN);
			}
		},
		onError: (e) => {
			toast.error(
				e.message ||
					'An error occurred while resetting your password. Please try again.',
			);
		},
	});

	return (
		<AuthWrapper header={<h2>Reset Password</h2>} showSocialButtons={false}>
			<Form<ResetPasswordDto>
				schema={resetPasswordSchema}
				onSubmit={(data) => mutate(data)}
			>
				{({ formState: { errors } }) => (
					<>
						{RESET_PASSWORD_FORM_FIELDS.map(
							({ name, isRequired, leftIcon, rightIcon: _, ...rest }) => {
								const Icon = leftIcon;
								return (
									<Form.Field key={name} name={name}>
										<TextField
											required={isRequired}
											leftIcon={Icon ? <Icon /> : undefined}
											error={errors[name]?.message}
											{...rest}
										/>
									</Form.Field>
								);
							},
						)}
						<Form.Submit buttonProps={{ fullWidth: true, loading: isPending }}>
							Reset Password
						</Form.Submit>
					</>
				)}
			</Form>
		</AuthWrapper>
	);
};

export default ResetPassword;
