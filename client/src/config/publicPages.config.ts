import { getAbsoluteUrl } from '@/utils';
import { SUBDOMAINS } from './subdomains.config';

export const PUBLIC_PAGES = {
	HOME: getAbsoluteUrl('', '/'),
	PUBLIC_PROJECT: (slug: string) =>
		getAbsoluteUrl(SUBDOMAINS.STATUS, `/${slug}`),
} as const;
