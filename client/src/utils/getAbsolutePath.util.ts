export const getAbsoluteUrl = (subdomain: string, path: string): string => {
	const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
	const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

	if (!rootDomain || !protocol) {
		throw new Error(
			'NEXT_PUBLIC_ROOT_DOMAIN and NEXT_PUBLIC_PROTOCOL must be defined',
		);
	}

	const host = subdomain ? `${subdomain}.${rootDomain}` : rootDomain;

	return `${protocol}${host}${path}`;
};
