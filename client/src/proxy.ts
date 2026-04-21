import { NextRequest, NextResponse } from 'next/server';
import { AUTH_PAGES, PRIVATE_PAGES } from './config';

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
	const path = request.nextUrl.pathname;

	if (!isAuthenticated && path.startsWith(PRIVATE_PAGES.DASHBOARD)) {
		response = NextResponse.redirect(new URL(AUTH_PAGES.LOGIN, request.url));
	} else if (
		isAuthenticated &&
		(path.startsWith(AUTH_PAGES.LOGIN) ||
			path.startsWith(AUTH_PAGES.SIGN_UP) ||
			path.startsWith(AUTH_PAGES.VERIFY_EMAIL))
	) {
		response = NextResponse.redirect(
			new URL(PRIVATE_PAGES.DASHBOARD, request.url),
		);
	} else {
		response = NextResponse.next({
			request: {
				headers: request.headers,
			},
		});
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
