export const PRIVATE_PAGES = {
	DASHBOARD: '/dashboard',
	MONITORS: '/dashboard/monitors',
	MONITOR: (id: string) => `/dashboard/monitor/${id}`,
	MONITOR_EDIT: (id: string) => `/dashboard/monitor/${id}/edit`,
	CREATE_MONITOR: '/dashboard/monitor/create',
	PROJECTS: '/dashboard/projects',
} as const;
