import { getAbsoluteUrl } from '@/utils/getAbsolutePath.util';
import { SUBDOMAINS } from './subdomains.config';

export const PUBLIC_PAGES = {
	HOME: getAbsoluteUrl(SUBDOMAINS.WWW, '/'),
	STATUS_PAGE: (slug: string) => getAbsoluteUrl(SUBDOMAINS.STATUS, `/${slug}`),
} as const;
