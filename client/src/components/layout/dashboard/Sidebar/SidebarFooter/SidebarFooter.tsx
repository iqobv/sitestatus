'use client';

import { Button } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import { useAuth } from '@/hooks';
import { MdLogout, MdOutlineSettings } from 'react-icons/md';
import SidebarLink from '../SidebarLink/SidebarLink';
import styles from './SidebarFooter.module.scss';

interface SidebarFooterProps {
	onClick: () => void;
}

const SidebarFooter = ({ onClick }: SidebarFooterProps) => {
	const { isAuthenticated, isLoading, logout } = useAuth();

	return (
		<div className={styles.footer}>
			{isAuthenticated && !isLoading && (
				<>
					<SidebarLink
						link={{
							href: PRIVATE_PAGES.SETTINGS.GENERAL,
							label: 'Settings',
							icon: MdOutlineSettings,
						}}
						onClick={onClick}
					/>
					<Button onClick={() => logout()} variant="secondary" fullWidth>
						<MdLogout size={20} /> Logout
					</Button>
				</>
			)}
		</div>
	);
};

export default SidebarFooter;
