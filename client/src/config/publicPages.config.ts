import { getAbsoluteUrl } from '@/utils';
import { SUBDOMAINS } from './subdomains.config';

export const PUBLIC_PAGES = {
	HOME: getAbsoluteUrl('', '/'),
	STATUS_PAGE: (slug: string) =>
		getAbsoluteUrl(SUBDOMAINS.STATUS, `/${slug}`),
} as const;
