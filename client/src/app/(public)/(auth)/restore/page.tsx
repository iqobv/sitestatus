import { RestoreAccount } from '@/components/auth';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Restore Account',
};

export default function RestorePage() {
	return (
		<Suspense fallback={null}>
			<RestoreAccount />
		</Suspense>
	);
}
