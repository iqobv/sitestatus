'use client';

import { Button } from '@/components/ui';
import { PAGES } from '@/config';
import { useAuth } from '@/hooks';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { MdLogout, MdNotificationsNone } from 'react-icons/md';
import HeaderContainer from '../HeaderContainer';
import styles from './DashboardHeader.module.scss';

const DashboardHeader = () => {
	const { logout } = useAuth();

	return (
		<HeaderContainer>
			<Link href="/dashboard">Dashboard</Link>
			<div className={styles['header__buttons']}>
				<Button
					className={styles['header__add-button']}
					href={PAGES.CREATE_MONITOR}
				>
					<FiPlus size={20} />
					<p className={styles['header__button-text']}>Add New Monitor</p>
				</Button>
				<Button variant="outlined" isIcon>
					<MdNotificationsNone size={20} />
				</Button>
				<Button onClick={() => logout()} variant="secondary" isIcon>
					<MdLogout size={20} />
				</Button>
			</div>
		</HeaderContainer>
	);
};

export default DashboardHeader;
