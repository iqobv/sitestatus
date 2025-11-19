import { Login } from '@/components/auth';
import { Metadata } from 'next';

import styles from '../authPage.module.scss';

export const metadata: Metadata = {
	title: 'Log in',
	description: 'Access your account to monitor your services.',
};

export default function LoginPage() {
	return (
		<div className={styles.page}>
			<Login />
		</div>
	);
}
