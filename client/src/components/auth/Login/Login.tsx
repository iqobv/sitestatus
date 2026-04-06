'use client';

import { login as apiLogin } from '@/api';
import { SectionHeader } from '@/components/ui';
import { PAGES } from '@/config';
import { LoginDto } from '@/dto';
import { useAuth } from '@/hooks';
import { loginSchema } from '@/schemas';
import { IUser } from '@/types';
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
			<AuthForm<LoginDto, IUser>
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
					<>
						Don&apos;t have an account?{' '}
						<Link style={{ fontWeight: 600 }} href={PAGES.SIGN_UP}>
							Sign Up
						</Link>
					</>
				}
			/>
		</AuthWrapper>
	);
};

export default Login;
