'use client';

import AuthForm from '../AuthForm/AuthForm';
import styles from './Login.module.scss';

const Login = () => {
	return (
		<div className={styles['login']}>
			<AuthForm />
		</div>
	);
};

export default Login;
