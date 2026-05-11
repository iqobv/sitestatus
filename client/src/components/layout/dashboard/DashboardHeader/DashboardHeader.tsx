'use client';

import { Button, IconButton } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { useAuth } from '@/hooks';
import { FiPlus } from 'react-icons/fi';
import { MdNotificationsNone } from 'react-icons/md';
import styles from './DashboardHeader.module.scss';

const DashboardHeader = () => {
	const { logout } = useAuth();

	return (
		<header className={styles.header}>
			<div className={styles.content}>
				<div className={styles.buttons}>
					<IconButton Icon={FiPlus} href={PRIVATE_PAGES.MONITORS.NEW}>
						Add New Monitor
					</IconButton>
					<Button variant="outlined" isIcon>
						<MdNotificationsNone size={20} />
					</Button>
				</div>
			</div>
		</header>
	);
};

export default DashboardHeader;
