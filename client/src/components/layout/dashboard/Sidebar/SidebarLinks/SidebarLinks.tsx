'use client';

import SidebarLink from '../SidebarLink/SidebarLink';
import styles from './SidebarLinks.module.scss';
import { SIDEBAR_LINKS } from './sidebarLinksItems';

interface SidebarLinksProps {
	onClick?: () => void;
}

const SidebarLinks = ({ onClick }: SidebarLinksProps) => {
	return (
		<div className={styles['sidebar-links']}>
			{SIDEBAR_LINKS.map((link) => (
				<SidebarLink key={link.href} link={link} onClick={onClick} />
			))}
		</div>
	);
};

export default SidebarLinks;
