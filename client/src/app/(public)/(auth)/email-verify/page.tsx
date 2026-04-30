import { EmailVerification } from '@/components/auth';
import { Suspense } from 'react';

export default function VerifyEmail() {
	return (
		<Suspense fallback={null}>
			<EmailVerification />
		</Suspense>
	);
}
