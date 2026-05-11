'use client';

import styles from './EmailVerification.module.scss';

interface EmailVerificationWrapperProps {
	children: React.ReactNode;
}

const EmailVerificationWrapper = ({
	children,
}: EmailVerificationWrapperProps) => {
	return <div className={`${styles.wrapper} container`}>{children}</div>;
};

export default EmailVerificationWrapper;
