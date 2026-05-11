import { PRIVATE_PAGES } from '@/config';

export interface SettingsTabsItem {
	href: string;
	label: string;
}

export const SETTINGS_TABS_ITEMS: SettingsTabsItem[] = [
	{
		href: PRIVATE_PAGES.SETTINGS.GENERAL,
		label: 'General',
	},
	{
		href: PRIVATE_PAGES.SETTINGS.SECURITY,
		label: 'Security',
	},
	{
		href: PRIVATE_PAGES.SETTINGS.ALERTING,
		label: 'Alerting',
	},
];
