import { LogoLink } from '@/components/ui';
import { PUBLIC_PAGES } from '@/config';
import styles from './AuthHeader.module.scss';

const AuthHeader = () => {
	return (
		<header className={styles.header}>
			<LogoLink
				href={PUBLIC_PAGES.HOME}
				className={styles.logo}
				logoProps={{ width: 52, height: 52 }}
			/>
		</header>
	);
};

export default AuthHeader;
