'use client';

import styles from './EmailVerification.module.scss';

interface EmailVerificationWrapperProps {
	children: React.ReactNode;
}

export const EmailVerificationWrapper = ({
	children,
}: EmailVerificationWrapperProps) => {
	return <div className={`${styles.wrapper} container`}>{children}</div>;
};
