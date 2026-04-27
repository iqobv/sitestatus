import { PUBLIC_PAGES } from '@/config';

interface LinkItem {
	label: string;
	href: string;
}

export const PUBLIC_PAGE_FOOTER_LINKS: LinkItem[] = [
	{
		label: 'Privacy Policy',
		href: PUBLIC_PAGES.HOME,
	},
	{
		label: 'Terms of Service',
		href: PUBLIC_PAGES.HOME,
	},
];
