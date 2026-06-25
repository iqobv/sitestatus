'use client';

import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui';
import { CROSS_DOMAIN_ROUTES } from '@/config/navigation.config';
import { PUBLIC_PAGES } from '@/config/publicPages.config';
import { HeaderContainer } from '../HeaderContainer';
import styles from './HeaderMain.module.scss';

export const HeaderMain = () => {
	return (
		<HeaderContainer
			headerClassName={styles.header}
			containerClassName={styles.container}
		>
			<a href={PUBLIC_PAGES.HOME} className={styles.logo}>
				<Logo width={32} height={32} />
				<span className={styles.logoText}>
					<span className={styles.highlight}>Site</span>
					Status
				</span>
			</a>
			<div className={styles.buttons}>
				<Button
					variant="link"
					href={CROSS_DOMAIN_ROUTES.APP_LOGIN}
					size="sm"
					asNative
				>
					Log in
				</Button>
				<Button href={CROSS_DOMAIN_ROUTES.APP_REGISTER} asNative>
					Sign Up
				</Button>
			</div>
		</HeaderContainer>
	);
};
