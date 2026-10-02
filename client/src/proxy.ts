import { NextRequest, NextResponse } from 'next/server';
import { AUTH_PAGES } from './config/authPages.config';
import { PRIVATE_PAGES } from './config/privatePages.config';
import { SUBDOMAINS } from './config/subdomains.config';

const extractRoutes = (obj: unknown): string[] => {
	if (typeof obj === 'string') return [obj];
	if (typeof obj === 'object' && obj !== null) {
		return Object.values(obj).flatMap(extractRoutes);
	}
	return [];
};

export async function proxy(request: NextRequest) {
	const url = request.nextUrl.clone();
	const path = url.pathname;
	const hostname = request.headers.get('host') || '';

	const isAppSubdomain = hostname.startsWith(`${SUBDOMAINS.APP}.`);
	const isStatusSubdomain = hostname.startsWith(`${SUBDOMAINS.STATUS}.`);

	if (path.startsWith(`/${SUBDOMAINS.APP}`)) {
		if (!isAppSubdomain) {
			url.pathname = '/404';
			return NextResponse.rewrite(url);
		}
		return NextResponse.next();
	}

	if (path.startsWith('/s/')) {
		if (!isStatusSubdomain) {
			url.pathname = '/404';
			return NextResponse.rewrite(url);
		}
		return NextResponse.next();
	}

	if (isStatusSubdomain) {
		url.pathname = `/s${path === '/' ? '' : path}`;
		return NextResponse.rewrite(url);
	}

	if (!isAppSubdomain) return NextResponse.next();

	const isAuthenticated = Boolean(
		request.cookies.get('accessToken')?.value ||
		request.cookies.get('refreshToken')?.value,
	);

	const authRoutes = extractRoutes(AUTH_PAGES);
	const isAuthRoute = authRoutes.some(
		(route) =>
			path === route || (route !== '/' && path.startsWith(`${route}/`)),
	);

	const protectedRoutes = extractRoutes(PRIVATE_PAGES);
	const isProtectedRoute =
		!isAuthRoute &&
		protectedRoutes.some(
			(route) =>
				path === route || (route !== '/' && path.startsWith(`${route}/`)),
		);

	if (!isAuthenticated && isProtectedRoute) {
		const loginUrl = new URL(AUTH_PAGES.LOGIN, request.url);
		loginUrl.searchParams.set('redirect', path + request.nextUrl.search);
		return NextResponse.redirect(loginUrl);
	}

	if (isAuthenticated && isAuthRoute) {
		let redirect =
			request.nextUrl.searchParams.get('redirect') || PRIVATE_PAGES.DASHBOARD;

		if (authRoutes.some((route) => redirect.startsWith(route))) {
			redirect = PRIVATE_PAGES.DASHBOARD;
		}

		return NextResponse.redirect(new URL(redirect, request.url));
	}

	const rewriteUrl = request.nextUrl.clone();
	rewriteUrl.pathname = `/${SUBDOMAINS.APP}${path}`;
	const response = NextResponse.rewrite(rewriteUrl, {
		request: { headers: new Headers(request.headers) },
	});

	response.headers.set('x-middleware-cache', 'no-cache');
	response.headers.set('Cache-Control', 'no-store, max-age=0');

	return response;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
