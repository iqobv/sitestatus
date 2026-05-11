import { getAbsoluteUrl } from '@/utils';
import { AUTH_PAGES } from './authPages.config';
import { SUBDOMAINS } from './subdomains.config';

export const CROSS_DOMAIN_ROUTES = {
	APP_LOGIN: getAbsoluteUrl(SUBDOMAINS.APP, AUTH_PAGES.LOGIN),
	APP_REGISTER: getAbsoluteUrl(SUBDOMAINS.APP, AUTH_PAGES.REGISTER),
} as const;
