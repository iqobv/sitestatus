import { PRIVATE_PAGES } from '@/config';
import { IconType } from 'react-icons';
import {
	MdOutlineDashboard,
	MdOutlineMonitorHeart,
	MdOutlineWorkspaces,
	MdPublic,
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
		href: PRIVATE_PAGES.MONITORS.ALL,
		label: 'Monitors',
		icon: MdOutlineMonitorHeart,
	},
	{
		href: PRIVATE_PAGES.PROJECTS.ALL,
		label: 'Projects',
		icon: MdOutlineWorkspaces,
	},
	{
		href: PRIVATE_PAGES.STATUS_PAGES.ALL,
		label: 'Status Pages',
		icon: MdPublic,
	},
];
