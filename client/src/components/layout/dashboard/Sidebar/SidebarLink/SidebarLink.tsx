'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { SidebarLink } from '../SidebarLinks/sidebarLinksItems';
import styles from './SidebarLink.module.scss';

interface SidebarLinkProps {
	link: SidebarLink;
	onClick?: () => void;
}

const SidebarLink = ({
	link,
	onClick,
}: SidebarLinkProps & { onClick?: () => void }) => {
	const pathname = usePathname();

	const { href, icon, label } = link;

	const Icon = icon;

	return (
		<Link
			key={href}
			href={href}
			className={`${styles['sidebar-link']} ${pathname === href ? styles['sidebar-link--active'] : ''}`}
			onClick={onClick}
		>
			<Icon size={22} />
			<span>{label}</span>
		</Link>
	);
};

export default SidebarLink;
