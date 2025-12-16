import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { PAGES } from './config';

export async function proxy(request: NextRequest) {
	const cookiesStore = await cookies();
	const hasSession = cookiesStore.has('sid');

	let isAuthenticated = false;
	let response: NextResponse;

	if (hasSession) {
		isAuthenticated = true;
	}

	const path = request.nextUrl.pathname;

	if (!isAuthenticated && path.startsWith(PAGES.DASHBOARD)) {
		response = NextResponse.redirect(new URL(PAGES.LOGIN, request.url));
	} else if (
		isAuthenticated &&
		(path.startsWith(PAGES.LOGIN) ||
			path.startsWith(PAGES.SIGN_UP) ||
			path.startsWith(PAGES.VERIFY_EMAIL))
	) {
		response = NextResponse.redirect(new URL(PAGES.DASHBOARD, request.url));
	} else {
		response = NextResponse.next();
	}

	return response;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
