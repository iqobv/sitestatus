'use client';

import { Logo } from '@/components/icons';
import { Button, Loader } from '@/components/ui';
import { PAGES } from '@/config';
import { useAuth } from '@/hooks';
import Link from 'next/link';
import { MdLogout } from 'react-icons/md';
import HeaderContainer from '../HeaderContainer';
import styles from './HeaderMain.module.scss';

const HeaderMain = () => {
	const { isAuthenticated, isLoading, logout } = useAuth();

	return (
		<HeaderContainer
			headerClassName={styles['header']}
			containerClassName={styles['header__container']}
		>
			<Link href={PAGES.HOME} className={styles['header__logo']}>
				<Logo width={32} height={32} />
				<span className={styles['header__logo-text']}>
					<span className={styles['header__logo-text--highlight']}>Site</span>
					Status
				</span>
			</Link>
			{isLoading && (
				<div>
					<Loader />
				</div>
			)}
			{!isLoading && !isAuthenticated && (
				<div className={styles['header__buttons']}>
					<Button variant="link" href={PAGES.LOGIN} size="sm">
						Log in
					</Button>
					<Button href={PAGES.SIGN_UP}>Sign Up</Button>
				</div>
			)}
			{!isLoading && isAuthenticated && (
				<div className={styles['header__buttons']}>
					<Button href={PAGES.DASHBOARD} variant="secondary">
						Dashboard
					</Button>
					<Button onClick={() => logout()} isIcon>
						<MdLogout size={20} />
					</Button>
				</div>
			)}
		</HeaderContainer>
	);
};

export default HeaderMain;
