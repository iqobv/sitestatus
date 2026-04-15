'use client';

import { register } from '@/api';
import { SectionHeader } from '@/components/ui';
import { PAGES } from '@/config';
import { RegisterFormDto } from '@/dto';
import { registerSchema } from '@/schemas';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthForm from '../AuthForm/AuthForm';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import { REGISTER_FIELDS } from './registerFields';

const Register = () => {
	const router = useRouter();

	return (
		<AuthWrapper header={<SectionHeader title="Create a new account" />}>
			<AuthForm<RegisterFormDto, { message: string; email: string }>
				fields={REGISTER_FIELDS}
				bottomText={
					<>
						Already have an account?{' '}
						<Link style={{ fontWeight: 600 }} href={PAGES.LOGIN}>
							Log In
						</Link>
					</>
				}
				defaultValues={{
					email: '',
					password: '',
					passwordConfirm: '',
				}}
				onSuccess={(data) => {
					if (
						data.message === 'Registration successful. Please check your email.'
					) {
						localStorage.setItem('registrationEmail', data.email);
						router.push(PAGES.VERIFY_EMAIL);
					}
				}}
				mutationFn={register}
				schema={registerSchema}
				buttonLabel="Sign Up"
			/>
		</AuthWrapper>
	);
};

export default Register;
