import { ResetPassword } from '@/components/auth';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Reset Password',
};

export default function ResetPasswordPage() {
	return (
		<Suspense fallback={null}>
			<ResetPassword />
		</Suspense>
	);
}
