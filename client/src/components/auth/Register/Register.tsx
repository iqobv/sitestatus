'use client';

import { register } from '@/api';
import { Checkbox, SectionHeader } from '@/components/ui';
import { AUTH_PAGES, LEGAL_PAGES } from '@/config';
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
						<Link style={{ fontWeight: 600 }} href={AUTH_PAGES.LOGIN}>
							Log In
						</Link>
					</>
				}
				defaultValues={{
					email: '',
					password: '',
					passwordConfirm: '',
					acceptTerms: false,
				}}
				onSuccess={(data) => {
					if (
						data.message === 'Registration successful. Please check your email.'
					) {
						localStorage.setItem('registrationEmail', data.email);
						router.push(AUTH_PAGES.VERIFY_EMAIL);
					}
				}}
				renderExtra={(register, error) => (
					<div>
						<Checkbox
							{...register('acceptTerms')}
							label={
								<span>
									I agree to the{' '}
									<Link href={LEGAL_PAGES.TERMS_OF_SERVICE} target="_blank">
										Terms of Service
									</Link>{' '}
									and{' '}
									<Link href={LEGAL_PAGES.PRIVACY_POLICY} target="_blank">
										Privacy Policy
									</Link>
								</span>
							}
							error={error}
						/>
					</div>
				)}
				mutationFn={register}
				schema={registerSchema}
				buttonLabel="Sign Up"
			/>
		</AuthWrapper>
	);
};

export default Register;
