import { Register } from '@/components/auth/Register/Register';
import { Metadata } from 'next';
import styles from '../authPage.module.scss';

export const metadata: Metadata = {
	title: 'Sign Up',
	description: 'Create a new account to monitor your services.',
};

export default function SignUpPage() {
	return (
		<div className={styles.page}>
			<Register />
		</div>
	);
}
