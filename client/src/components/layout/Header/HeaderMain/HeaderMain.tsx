'use client';

import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui';
import { CROSS_DOMAIN_ROUTES } from '@/config/navigation.config';
import { PUBLIC_PAGES } from '@/config/publicPages.config';
import Link from 'next/link';
import { HeaderContainer } from '../HeaderContainer';
import styles from './HeaderMain.module.scss';

export const HeaderMain = () => {
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
				<Button variant="link" href={CROSS_DOMAIN_ROUTES.APP_LOGIN} size="sm">
					Log in
				</Button>
				<Button href={CROSS_DOMAIN_ROUTES.APP_REGISTER}>Sign Up</Button>
			</div>
		</HeaderContainer>
	);
};
