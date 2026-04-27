export const PRIVATE_PAGES = {
	DASHBOARD: '/dashboard',
	MONITORS: {
		ALL: '/dashboard/monitors',
		ONE: (id: string) => `/dashboard/monitors/${id}`,
		NEW: '/dashboard/monitors/new',
		EDIT: (id: string) => `/dashboard/monitors/${id}/edit`,
	} as const,
	PROJECTS: {
		ALL: '/dashboard/projects',
		SLUG: (slug: string) => `/dashboard/projects/${slug}`,
		ID: (id: string) => `/dashboard/projects/${id}`,
		NEW: '/dashboard/projects/new',
		EDIT: (id: string) => `/dashboard/projects/${id}/edit`,
	} as const,
} as const;
