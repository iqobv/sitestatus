import { getAbsoluteUrl } from '@/utils';

export const LEGAL_PAGES = {
	PRIVACY_POLICY: getAbsoluteUrl('', '/privacy'),
	TERMS_OF_SERVICE: getAbsoluteUrl('', '/terms'),
	COOKIE_POLICY: getAbsoluteUrl('', '/cookies'),
	ABOUT_US: getAbsoluteUrl('', '/about'),
} as const;
