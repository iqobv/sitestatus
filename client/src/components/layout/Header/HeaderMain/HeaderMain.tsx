'use client';

import { Button, Loader } from '@/components/ui';
import { PAGES } from '@/config';
import { useAuth } from '@/hooks';
import Link from 'next/link';
import HeaderContainer from '../HeaderContainer';

import { MdLogout, MdNotificationsNone } from 'react-icons/md';
import styles from './HeaderMain.module.scss';

const HeaderMain = () => {
	const { isAuthenticated, isLoading, logout } = useAuth();

	return (
		<HeaderContainer>
			<Link href={PAGES.HOME}>SiteStatus</Link>
			{isLoading && (
				<div>
					<Loader />
				</div>
			)}
			{!isLoading && !isAuthenticated && (
				<div className={styles['header__buttons']}>
					<Button variant="text" href={PAGES.LOGIN}>
						Log in
					</Button>
					<Button href={PAGES.SIGN_UP}>Sign Up</Button>
				</div>
			)}
			{!isLoading && isAuthenticated && (
				<div className={styles['header__buttons']}>
					<Button variant="outlined" isIcon>
						<MdNotificationsNone size={20} />
					</Button>
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
