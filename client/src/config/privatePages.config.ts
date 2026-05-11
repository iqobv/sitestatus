export const PRIVATE_PAGES = {
	DASHBOARD: '/' as const,
	MONITORS: {
		ALL: '/monitors',
		ONE: (id: string) => `/monitors/${id}`,
		NEW: '/monitors/new',
		EDIT: (id: string) => `/monitors/${id}/edit`,
		INCIDENT: (monitorId: string, incidentId: string) =>
			`/monitors/${monitorId}/incidents/${incidentId}`,
	} as const,
	PROJECTS: {
		ALL: '/projects',
		SLUG: (slug: string) => `/projects/${slug}`,
		ID: (id: string) => `/projects/${id}`,
		NEW: '/projects/new',
		EDIT: (id: string) => `/projects/${id}/edit`,
	} as const,
	BASE_SETTINGS: '/settings' as const,
	SETTINGS: {
		GENERAL: '/settings',
		SECURITY: '/settings/security',
		SESSIONS: '/settings/security/sessions',
		ALERTING: '/settings/alerting',
		ALERTING_VERIFY: (token: string) =>
			`/settings/alerting/verify?token=${token}`,
		CHANGE_PASSWORD: '/settings/security/change-password',
	} as const,
	STATUS_PAGES: {
		ALL: '/status-pages',
		ID: (id: string) => `/status-pages/${id}`,
		NEW: '/status-pages/new',
		EDIT: (id: string) => `/status-pages/${id}/edit`,
	} as const,
} as const;
