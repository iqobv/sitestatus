'use client';

import SocialButtons from '../SocialButtons/SocialButtons';
import styles from './AuthWrapper.module.scss';

interface AuthWrapperProps {
	children?: React.ReactNode;
	header?: React.ReactNode;
}

const AuthWrapper = ({ children, header }: AuthWrapperProps) => {
	return (
		<div className={`${styles.wrapper} container`}>
			{!!header && <div className={styles.authHeader}>{header}</div>}
			<SocialButtons />
			{children}
		</div>
	);
};

export default AuthWrapper;
