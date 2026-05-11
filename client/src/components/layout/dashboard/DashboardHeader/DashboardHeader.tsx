'use client';

import { IconButton } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { FiPlus } from 'react-icons/fi';
import styles from './DashboardHeader.module.scss';
import { NotificationList } from './NotificationList';

const DashboardHeader = () => {
	return (
		<header className={styles.header}>
			<div className={styles.content}>
				<div className={styles.buttons}>
					<IconButton Icon={FiPlus} href={PRIVATE_PAGES.MONITORS.NEW}>
						Add New Monitor
					</IconButton>
					<NotificationList />
				</div>
			</div>
		</header>
	);
};

export default DashboardHeader;
