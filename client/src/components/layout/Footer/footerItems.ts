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
		],
	},
	{
		title: 'Resources',
		links: [
			{
				label: 'API Documentation',
				href: `${process.env.NEXT_PUBLIC_API_URL}/docs`,
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
			{
				label: 'Cookie Policy',
				href: PUBLIC_PAGES.HOME,
			},
		],
	},
];
