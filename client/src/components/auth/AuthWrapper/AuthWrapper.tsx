'use client';

import SocialButtons from '../SocialButtons/SocialButtons';
import styles from './AuthWrapper.module.scss';

interface AuthWrapperProps {
	children?: React.ReactNode;
	header?: React.ReactNode;
	showSocialButtons?: boolean;
}

const AuthWrapper = ({
	children,
	header,
	showSocialButtons = true,
}: AuthWrapperProps) => {
	return (
		<div className={`${styles.wrapper} container`}>
			{!!header && <div className={styles.authHeader}>{header}</div>}
			{showSocialButtons && <SocialButtons />}
			{children}
		</div>
	);
};

export default AuthWrapper;
