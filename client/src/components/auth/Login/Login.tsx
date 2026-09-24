'use client';

import { login } from '@/api/auth/auth.api';
import { SectionHeader } from '@/components/ui';
import { AUTH_PAGES } from '@/config/authPages.config';
import { LoginDto } from '@/dto/auth.dto';
import { loginSchema } from '@/schemas/auth/login.schema';
import { User } from '@/types/user/user.types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthForm } from '../AuthForm/AuthForm';
import { AuthWrapper } from '../AuthWrapper/AuthWrapper';
import { LOGIN_FIELDS } from './loginFields';

export const Login = () => {
	const router = useRouter();

	return (
		<AuthWrapper header={<SectionHeader title="Log in to your account" />}>
			<AuthForm<LoginDto, User>
				fields={LOGIN_FIELDS}
				defaultValues={{
					email: '',
					password: '',
				}}
				onSuccess={(data) => {
					if (data) router.refresh();
				}}
				mutationFn={login}
				schema={loginSchema}
				buttonLabel="Log in"
				bottomText={
					<div
						style={{
							display: 'flex',
							gap: 'var(--gap)',
							flexDirection: 'column',
						}}
					>
						<div>
							Forgot your password?{' '}
							<Link
								style={{ fontWeight: 600 }}
								href={AUTH_PAGES.FORGOT_PASSWORD}
							>
								Reset it
							</Link>
						</div>
						<div>
							Don&apos;t have an account?{' '}
							<Link style={{ fontWeight: 600 }} href={AUTH_PAGES.REGISTER}>
								Sign Up
							</Link>
						</div>
					</div>
				}
			/>
		</AuthWrapper>
	);
};
