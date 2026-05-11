import { LEGAL_PAGES } from '@/config';

interface LinkItem {
	label: string;
	href: string;
}

export const STATUS_PAGE_FOOTER_LINKS: LinkItem[] = [
	{
		label: 'Privacy Policy',
		href: LEGAL_PAGES.PRIVACY_POLICY,
	},
	{
		label: 'Terms of Service',
		href: LEGAL_PAGES.TERMS_OF_SERVICE,
	},
];
