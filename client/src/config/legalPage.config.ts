import { getAbsoluteUrl } from '@/utils';
import { SUBDOMAINS } from './subdomains.config';

export const LEGAL_PAGES = {
	PRIVACY_POLICY: getAbsoluteUrl(SUBDOMAINS.WWW, '/privacy'),
	TERMS_OF_SERVICE: getAbsoluteUrl(SUBDOMAINS.WWW, '/terms'),
	COOKIE_POLICY: getAbsoluteUrl(SUBDOMAINS.WWW, '/cookies'),
	ABOUT_US: getAbsoluteUrl(SUBDOMAINS.WWW, '/about'),
} as const;
