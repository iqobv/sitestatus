import { EmailVerification } from '@/components/auth/EmailVerification/EmailVerification';
import { Suspense } from 'react';

export default function VerifyEmail() {
	return (
		<Suspense fallback={null}>
			<EmailVerification />
		</Suspense>
	);
}
