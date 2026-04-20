'use client';

import { Button } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { useAuth } from '@/hooks';
import { FiPlus } from 'react-icons/fi';
import { MdNotificationsNone } from 'react-icons/md';
import styles from './DashboardHeader.module.scss';

const DashboardHeader = () => {
	const { logout } = useAuth();

	return (
		<header className={styles['dashboard-header']}>
			<div className={styles['dashboard-header__content']}>
				<div className={styles['dashboard-header__buttons']}>
					<Button
						className={styles['dashboard-header__add-button']}
						href={PRIVATE_PAGES.MONITORS.NEW}
					>
						<FiPlus size={20} />
						<p className={styles['dashboard-header__button-text']}>
							Add New Monitor
						</p>
					</Button>
					<Button variant="outlined" isIcon>
						<MdNotificationsNone size={20} />
					</Button>
				</div>
			</div>
		</header>
	);
};

export default DashboardHeader;
