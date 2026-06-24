'use client';

import { LogoLink } from '@/components/ui';
import { PRIVATE_PAGES } from '@/config';
import styles from './SidebarHeader.module.scss';

interface SidebarHeaderProps {
	onClick?: () => void;
}

export const SidebarHeader = ({ onClick }: SidebarHeaderProps) => {
	return (
		<div className={styles.header}>
			<LogoLink href={PRIVATE_PAGES.DASHBOARD} onClick={onClick} />
		</div>
	);
};
