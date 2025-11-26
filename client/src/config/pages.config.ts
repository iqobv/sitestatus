export const PAGES = {
	home: '/',
	verifyEmail: '/email-verify',
	login: '/login',
	signUp: '/sign-up',
	dashboard: '/dashboard',
	monitor: (id: string) => `/dashboard/monitor/${id}`,
} as const;
