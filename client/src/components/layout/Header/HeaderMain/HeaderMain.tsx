'use client';

import { Logo } from '@/components/icons';
import { Button } from '@/components/ui';
import { AUTH_PAGES, PUBLIC_PAGES } from '@/config';
import Link from 'next/link';
import HeaderContainer from '../HeaderContainer';
import styles from './HeaderMain.module.scss';

const HeaderMain = () => {
	return (
		<HeaderContainer
			headerClassName={styles.header}
			containerClassName={styles.container}
		>
			<Link href={PUBLIC_PAGES.HOME} className={styles.logo}>
				<Logo width={32} height={32} />
				<span className={styles.logoText}>
					<span className={styles.highlight}>Site</span>
					Status
				</span>
			</Link>
			<div className={styles.buttons}>
				<Button variant="link" href={AUTH_PAGES.LOGIN} size="sm">
					Log in
				</Button>
				<Button href={AUTH_PAGES.SIGN_UP}>Sign Up</Button>
			</div>
		</HeaderContainer>
	);
};

export default HeaderMain;
