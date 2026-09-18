import { env } from '@/env';

export const getAbsoluteUrl = (subdomain: string, path: string): string => {
	const rootDomain = env.NEXT_PUBLIC_ROOT_DOMAIN;
	const protocol = env.NEXT_PUBLIC_PROTOCOL;

	const host = subdomain ? `${subdomain}.${rootDomain}` : rootDomain;

	return `${protocol}${host}${path}`;
};
