import { NextRequest, NextResponse } from 'next/server';
import { AUTH_PAGES } from './config/authPages.config';
import { PRIVATE_PAGES } from './config/privatePages.config';
import { SUBDOMAINS } from './config/subdomains.config';
import { TOKEN_PAGES } from './config/tokenPages.config';
import { appendCorsHeaders, getValidatedOrigin } from './utils/cors.util';

export async function proxy(request: NextRequest) {
	const origin = getValidatedOrigin(request);

	if (request.method === 'OPTIONS') {
		const preflightHeaders = new Headers();

		if (origin) {
			appendCorsHeaders(preflightHeaders, origin);
		}

		return new NextResponse(null, {
			status: 204,
			headers: preflightHeaders,
		});
	}

	const accessToken = request.cookies.get('accessToken')?.value;
	const refreshToken = request.cookies.get('refreshToken')?.value;

	let isAuthenticated = !!accessToken;
	let refreshedCookies: string[] = [];

	if (!accessToken && refreshToken) {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
				{
					method: 'POST',
					headers: {
						Cookie: `refreshToken=${refreshToken}`,
					},
					cache: 'no-store',
				},
			);

			if (res.ok) {
				isAuthenticated = true;
				refreshedCookies = res.headers.getSetCookie();

				refreshedCookies.forEach((cookie) => {
					const [cookiePair] = cookie.split(';');
					const [name, ...rest] = cookiePair.split('=');
					const value = rest.join('=');
					if (name && value) {
						request.cookies.set(name.trim(), value.trim());
					}
				});
			} else {
				isAuthenticated = false;
			}
		} catch {
			isAuthenticated = false;
		}
	}

	let response: NextResponse;

	const url = request.nextUrl.clone();
	const hostname = request.headers.get('host') || '';
	const path = url.pathname;

	const search = request.nextUrl.search;

	const isAppSubdomain = hostname.startsWith(`${SUBDOMAINS.APP}.`);
	const isStatusSubdomain = hostname.startsWith(`${SUBDOMAINS.STATUS}.`);
	const isAuthPage = Object.values(AUTH_PAGES).some((page) =>
		path.startsWith(page),
	);
	const isTokenPage = Object.values(TOKEN_PAGES).some((page) =>
		path.startsWith(page),
	);

	if (isAppSubdomain) {
		if (!isAuthenticated && !isAuthPage && !isTokenPage) {
			url.pathname = AUTH_PAGES.LOGIN;
			url.search = search;
			response = NextResponse.redirect(url);
		} else if (isAuthenticated && isAuthPage) {
			url.pathname = PRIVATE_PAGES.DASHBOARD;
			response = NextResponse.redirect(url);
		} else {
			const internalPath = isAuthPage
				? path
				: `/app${path === '/' ? '' : path}`;
			const targetUrl = new URL(`${internalPath}${search}`, request.url);
			response = NextResponse.rewrite(targetUrl);
		}
	} else if (isStatusSubdomain) {
		const targetUrl = new URL(`/s${path}${search}`, request.url);
		response = NextResponse.rewrite(targetUrl);
	} else {
		const isPrivateSection =
			path.startsWith(PRIVATE_PAGES.MONITORS.ALL) ||
			path.startsWith(PRIVATE_PAGES.PROJECTS.ALL) ||
			path.startsWith(PRIVATE_PAGES.BASE_SETTINGS);

		if (isPrivateSection || isAuthPage || isTokenPage) {
			const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || '';
			url.host = `${SUBDOMAINS.APP}.${rootDomain}`;
			url.pathname = path.replace('/app', '');
			url.search = search;
			response = NextResponse.redirect(url);
		} else {
			response = NextResponse.next({
				request: {
					headers: request.headers,
				},
			});
		}
	}

	if (refreshedCookies.length > 0) {
		refreshedCookies.forEach((cookie) => {
			response.headers.append('Set-Cookie', cookie);
		});
	}

	if (origin) {
		appendCorsHeaders(response.headers, origin);
	}

	return response;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
