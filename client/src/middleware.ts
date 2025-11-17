import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { PAGES } from './config';
import { IUser } from './types';

export async function middleware(request: NextRequest) {
	const cookiesStore = await cookies();
	const hasSession = cookiesStore.has('refreshToken');
	const allCookies = cookiesStore.toString();

	let isAuthenticated = false;
	let user: IUser | null = null;
	let response: NextResponse;

	const setCookieHeaders: string[] = [];

	if (hasSession) {
		const res = await fetch(`${process.env.API_URL}/v1/auth/refresh`, {
			method: 'POST',
			headers: {
				cookie: allCookies,
				'Content-Type': 'application/json',
			},
		});
		const data = (await res.json()) as { accessToken: string };

		const newCookies = res.headers.getSetCookie();
		if (newCookies.length > 0) {
			setCookieHeaders.push(...newCookies);
		}

		if (res.ok && data && data.accessToken) {
			const profileRes = await fetch(`${process.env.API_URL}/v1/auth/me`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${data.accessToken}`,
					cookie: allCookies,
				},
			});

			const profileCookies = profileRes.headers.getSetCookie();
			if (profileCookies.length > 0) {
				setCookieHeaders.push(...profileCookies);
			}

			const userData = (await profileRes.json()) as IUser;

			if (profileRes.ok && (userData as IUser)?.id) {
				user = userData as IUser;
				isAuthenticated = true;
			}
		} else {
			isAuthenticated = false;
		}
	}

	const path = request.nextUrl.pathname;

	if (!isAuthenticated && path.startsWith(PAGES.dashboard)) {
		response = NextResponse.redirect(new URL(PAGES.login, request.url));
	} else if (
		isAuthenticated &&
		user?.emailVerified &&
		path.startsWith(PAGES.verifyEmail)
	) {
		response = NextResponse.redirect(new URL(PAGES.dashboard, request.url));
	} else if (
		isAuthenticated &&
		(path.startsWith(PAGES.login) ||
			path.startsWith(PAGES.signUp) ||
			path.startsWith(PAGES.verifyEmail))
	) {
		response = NextResponse.redirect(new URL(PAGES.dashboard, request.url));
	} else {
		response = NextResponse.next();
	}

	setCookieHeaders.forEach((cookie) => {
		response.headers.append('set-cookie', cookie);
	});

	if (hasSession && !isAuthenticated) {
		response.cookies.set('refreshToken', '', { maxAge: -1 });
	}

	return response;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
