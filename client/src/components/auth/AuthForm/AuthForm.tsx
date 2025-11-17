'use client';

import { Button } from '@/components/ui';
import styles from './AuthForm.module.scss';

const AuthForm = () => {
	return (
		<div className={styles['auth-form']}>
			<form>
				<Button>Test</Button>
			</form>
		</div>
	);
};

export default AuthForm;
