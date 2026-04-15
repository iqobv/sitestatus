import { PRIVATE_PAGES } from '@/config';
import { IconType } from 'react-icons';
import {
	MdOutlineDashboard,
	MdOutlineMonitorHeart,
	MdOutlineWorkspaces,
} from 'react-icons/md';

export interface SidebarLink {
	href: string;
	label: string;
	icon: IconType;
}

export const SIDEBAR_LINKS: SidebarLink[] = [
	{
		href: PRIVATE_PAGES.DASHBOARD,
		label: 'Home',
		icon: MdOutlineDashboard,
	},
	{
		href: PRIVATE_PAGES.MONITORS,
		label: 'Monitors',
		icon: MdOutlineMonitorHeart,
	},
	{
		href: PRIVATE_PAGES.PROJECTS,
		label: 'Projects',
		icon: MdOutlineWorkspaces,
	},
];
