'use client';

import styles from './EmailVerification.module.scss';

interface EmailVerificationWrapperProps {
	children: React.ReactNode;
}

const EmailVerificationWrapper = ({
	children,
}: EmailVerificationWrapperProps) => {
	return (
		<div className={`${styles['email-verification__wrapper']} container page`}>
			{children}
		</div>
	);
};

export default EmailVerificationWrapper;
