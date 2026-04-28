'use client';

import { MdErrorOutline } from 'react-icons/md';
import styles from './AuthFormGlobalError.module.scss';

interface AuthFormGlobalErrorProps {
	message: React.ReactNode;
}

const AuthFormGlobalError = ({ message }: AuthFormGlobalErrorProps) => {
	return (
		<div className={styles.error}>
			<MdErrorOutline />
			<div className={styles.message}>{message}</div>
		</div>
	);
};

export default AuthFormGlobalError;
