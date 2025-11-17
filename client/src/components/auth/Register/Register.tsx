'use client';

import AuthForm from '../AuthForm/AuthForm';
import styles from './Register.module.scss';

const Register = () => {
	return (
		<div className={styles['register']}>
			<AuthForm />
		</div>
	);
};

export default Register;
