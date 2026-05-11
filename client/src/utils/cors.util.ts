import { NextRequest } from 'next/server';

export const getValidatedOrigin = (request: NextRequest): string | null => {
	const origin = request.headers.get('origin');

	if (!origin) {
		return null;
	}

	const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

	if (!rootDomain) {
		return origin;
	}

	try {
		const originUrl = new URL(origin);
		const hostname = originUrl.hostname;

		const isValid =
			hostname === rootDomain ||
			hostname.endsWith(`.${rootDomain}`) ||
			hostname === 'localhost';

		if (isValid) {
			return origin;
		}

		return null;
	} catch {
		return null;
	}
};

export const appendCorsHeaders = (headers: Headers, origin: string): void => {
	headers.set('Access-Control-Allow-Origin', origin);
	headers.set('Access-Control-Allow-Credentials', 'true');
	headers.set(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS',
	);
	headers.set(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, rsc, next-router-state-tree, next-router-prefetch, next-url',
	);
	headers.set('Access-Control-Max-Age', '86400');
};
