import { Metadata } from 'next';

import { Login } from '@/components/auth/Login/Login';
import { Suspense } from 'react';
import styles from '../authPage.module.scss';

export const metadata: Metadata = {
	title: 'Log in',
	description: 'Access your account to monitor your services.',
};

export default function LoginPage() {
	return (
		<div className={styles.page}>
			<Suspense fallback={null}>
				<Login />
			</Suspense>
		</div>
	);
}
