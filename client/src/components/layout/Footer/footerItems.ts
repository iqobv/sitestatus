import { LEGAL_PAGES, PUBLIC_PAGES } from '@/config';

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
				href: LEGAL_PAGES.ABOUT_US,
			},
			{
				label: 'Privacy Policy',
				href: LEGAL_PAGES.PRIVACY_POLICY,
			},
			{
				label: 'Terms of Service',
				href: LEGAL_PAGES.TERMS_OF_SERVICE,
			},
			{
				label: 'Cookie Policy',
				href: LEGAL_PAGES.COOKIE_POLICY,
			},
		],
	},
];
