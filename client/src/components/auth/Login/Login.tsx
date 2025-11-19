'use client';

import { login as apiLogin } from '@/api';
import { SectionHeader } from '@/components/ui';
import { PAGES } from '@/config';
import { LoginDto } from '@/dto';
import { useAuth } from '@/hooks';
import { LoginSchema } from '@/schemas';
import { ILoginResponse } from '@/types';
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
			<AuthForm<LoginDto, ILoginResponse>
				fields={LOGIN_FIELDS}
				defaultValues={{
					email: '',
					password: '',
				}}
				onSuccess={(data) => {
					const { accessToken, user } = data;
					if (accessToken && user) {
						login(user, accessToken);
						router.refresh();
					}
				}}
				mutationFn={apiLogin}
				schema={LoginSchema}
				buttonLabel="Log in"
				bottomText={
					<>
						Don&apos;t have an account?{' '}
						<Link style={{ fontWeight: 600 }} href={PAGES.signUp}>
							Sign Up
						</Link>
					</>
				}
			/>
		</AuthWrapper>
	);
};

export default Login;
