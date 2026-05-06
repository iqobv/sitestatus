'use client';

import { login as apiLogin } from '@/api';
import { SectionHeader } from '@/components/ui';
import { AUTH_PAGES } from '@/config';
import { LoginDto } from '@/dto';
import { useAuth } from '@/hooks';
import { loginSchema } from '@/schemas';
import { User } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthForm from '../AuthForm/AuthForm';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import { LOGIN_FIELDS } from './loginFields';

const Login = () => {
	const { login } = useAuth();
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
					if (data) {
						login(data);
						router.refresh();
					}
				}}
				mutationFn={apiLogin}
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

export default Login;
