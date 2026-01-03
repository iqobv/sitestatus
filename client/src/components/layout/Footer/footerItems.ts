import { PAGES } from '@/config';

interface LinkItem {
	label: string;
	href: string;
}

interface FooterItem {
	title: string;
	links: LinkItem[];
}

export const FOOTER_ITEMS: FooterItem[] = [
	{
		title: 'Product',
		links: [
			{
				label: 'Features',
				href: `${PAGES.HOME}#features`,
			},
			{
				label: 'Changelog',
				href: PAGES.HOME,
			},
		],
	},
	{
		title: 'Resources',
		links: [
			{
				label: 'Blog',
				href: PAGES.HOME,
			},
			{
				label: 'Help Center',
				href: PAGES.HOME,
			},
			{
				label: 'API Documentation',
				href: PAGES.HOME,
			},
		],
	},
	{
		title: 'Company',
		links: [
			{
				label: 'About Us',
				href: PAGES.HOME,
			},
			{
				label: 'Privacy Policy',
				href: PAGES.HOME,
			},
			{
				label: 'Terms of Service',
				href: PAGES.HOME,
			},
		],
	},
];
