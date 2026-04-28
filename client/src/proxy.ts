import { NextRequest, NextResponse } from 'next/server';
import { AUTH_PAGES, PRIVATE_PAGES, SUBDOMAINS } from './config';

export async function proxy(request: NextRequest) {
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
		} catch (error) {
			isAuthenticated = false;
		}
	}

	let response: NextResponse;

	const url = request.nextUrl.clone();
	const hostname = request.headers.get('host') || '';
	const path = url.pathname;

	const isAppSubdomain = hostname.startsWith(`${SUBDOMAINS.APP}.`);
	const isStatusSubdomain = hostname.startsWith(`${SUBDOMAINS.STATUS}.`);
	const isAuthPage = Object.values(AUTH_PAGES).some((page) =>
		path.startsWith(page),
	);

	if (isAppSubdomain) {
		if (!isAuthenticated && !isAuthPage) {
			url.pathname = AUTH_PAGES.LOGIN;
			response = NextResponse.redirect(url);
		} else if (isAuthenticated && isAuthPage) {
			url.pathname = PRIVATE_PAGES.DASHBOARD;
			response = NextResponse.redirect(url);
		} else {
			const internalPath = isAuthPage
				? path
				: path === '/'
					? '/dashboard'
					: `/dashboard${path}`;
			response = NextResponse.rewrite(new URL(internalPath, request.url));
		}
	} else if (isStatusSubdomain) {
		const internalPath = `/p${path}`;
		response = NextResponse.rewrite(new URL(internalPath, request.url));
	} else {
		const isPrivateSection =
			path.startsWith(PRIVATE_PAGES.MONITORS.ALL) ||
			path.startsWith(PRIVATE_PAGES.PROJECTS.ALL);

		if (isPrivateSection || isAuthPage) {
			const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || '';
			url.host = `${SUBDOMAINS.APP}.${rootDomain}`;
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

	return response;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
