import { PUBLIC_PAGES } from '@/config';

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
				href: `${PUBLIC_PAGES.HOME}#features`,
			},
			{
				label: 'Changelog',
				href: PUBLIC_PAGES.HOME,
			},
		],
	},
	{
		title: 'Resources',
		links: [
			{
				label: 'Blog',
				href: PUBLIC_PAGES.HOME,
			},
			{
				label: 'Help Center',
				href: PUBLIC_PAGES.HOME,
			},
			{
				label: 'API Documentation',
				href: PUBLIC_PAGES.HOME,
			},
		],
	},
	{
		title: 'Company',
		links: [
			{
				label: 'About Us',
				href: PUBLIC_PAGES.HOME,
			},
			{
				label: 'Privacy Policy',
				href: PUBLIC_PAGES.HOME,
			},
			{
				label: 'Terms of Service',
				href: PUBLIC_PAGES.HOME,
			},
		],
	},
];
