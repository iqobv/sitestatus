'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { SidebarLink as SidebarLinkType } from '../SidebarLinks/sidebarLinksItems';
import styles from './SidebarLink.module.scss';

interface SidebarLinkProps {
	link: SidebarLinkType;
	onClick?: () => void;
}

export const SidebarLink = ({
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
			className={`${styles.link} ${pathname === href ? styles.active : ''}`}
			onClick={onClick}
		>
			<Icon size={22} />
			<span>{label}</span>
		</Link>
	);
};
