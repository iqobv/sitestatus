export const PRIVATE_PAGES = {
	DASHBOARD: '',
	MONITORS: {
		ALL: '/monitors',
		ONE: (id: string) => `/monitors/${id}`,
		NEW: '/monitors/new',
		EDIT: (id: string) => `/monitors/${id}/edit`,
	} as const,
	PROJECTS: {
		ALL: '/projects',
		SLUG: (slug: string) => `/projects/${slug}`,
		ID: (id: string) => `/projects/${id}`,
		NEW: '/projects/new',
		EDIT: (id: string) => `/projects/${id}/edit`,
	} as const,
} as const;
