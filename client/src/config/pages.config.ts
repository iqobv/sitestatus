export const PAGES = {
	HOME: '/',
	VERIFY_EMAIL: '/email-verify',
	LOGIN: '/login',
	SIGN_UP: '/sign-up',
	DASHBOARD: '/dashboard',
	MONITOR: (id: string) => `/dashboard/monitor/${id}`,
	MONITOR_EDIT: (id: string) => `/dashboard/monitor/${id}/edit`,
	CREATE_MONITOR: '/dashboard/monitor/create',
} as const;
