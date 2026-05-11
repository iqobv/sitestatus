'use client';

import { forgotPassword } from '@/api';
import { Form, TextField } from '@/components/ui';
import { AUTH_PAGES } from '@/config';
import { EmailDto } from '@/dto';
import { emailSchema } from '@/schemas';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { MdOutlineEmail } from 'react-icons/md';
import { toast } from 'react-toastify';
import AuthWrapper from '../../AuthWrapper/AuthWrapper';
import styles from './ForgotPassword.module.scss';

const ForgotPassword = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: (data: EmailDto) => forgotPassword(data),
		onSuccess: (data) => {
			toast.info(
				data.message ||
					'If an account with that email exists, a reset link has been sent.',
			);
		},
		onError: (error) => {
			toast.error(
				error.message || 'An error occurred while sending the reset link.',
			);
		},
	});

	return (
		<AuthWrapper header={<h1>Forgot Password</h1>} showSocialButtons={false}>
			<Form<EmailDto>
				onSubmit={(data) => mutate(data)}
				schema={emailSchema}
				defaultValues={{ email: '' }}
			>
				<Form.Field name="email">
					<TextField
						type="email"
						label="Email"
						placeholder="Enter your email"
						autoComplete="email"
						leftIcon={<MdOutlineEmail size={20} />}
					/>
				</Form.Field>
				<Form.Submit
					disabledOnEmpty
					className={styles.submit}
					buttonProps={{
						fullWidth: true,
						loading: isPending,
					}}
				>
					Send Reset Link
				</Form.Submit>
			</Form>
			<div className={styles.returnLogin}>
				Return to{' '}
				<Link style={{ fontWeight: 600 }} href={AUTH_PAGES.LOGIN}>
					Login
				</Link>
			</div>
		</AuthWrapper>
	);
};

export default ForgotPassword;
