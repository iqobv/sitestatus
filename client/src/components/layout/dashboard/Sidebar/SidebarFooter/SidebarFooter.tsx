'use client';

import { Button } from '@/components/ui';
import { useAuth } from '@/hooks';
import { MdLogout } from 'react-icons/md';
import styles from './SidebarFooter.module.scss';

const SidebarFooter = () => {
	const { isAuthenticated, isLoading, logout } = useAuth();

	return (
		<div className={styles['sidebar-footer']}>
			{isAuthenticated && !isLoading && (
				<Button onClick={() => logout()} variant="secondary" fullWidth>
					<MdLogout size={20} /> Logout
				</Button>
			)}
		</div>
	);
};

export default SidebarFooter;
