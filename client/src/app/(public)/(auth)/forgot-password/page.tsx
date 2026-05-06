import { ForgotPassword } from '@/components/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Forgot Password',
};

export default async function ForgotPasswordPage() {
	return <ForgotPassword />;
}
