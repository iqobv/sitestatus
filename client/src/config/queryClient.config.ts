export const QUERY_KEYS = {
	auth: {
		login: ['login'],
		register: ['register'],
		refresh: ['refreshAuthToken'],
		logout: ['logout'],
		profile: ['profile'],
		verifyEmail: (token: string) => ['verifyEmail', token],
		resendVerificationEmail: (email: string) => [
			'resendVerificationEmail',
			email,
		],
	} as const,
	monitors: {
		list: ['monitorsList'],
		allByProjectId: (projectId: string) => [
			'monitorsAllByProjectId',
			projectId,
		],
		byId: (monitorId: string) => ['monitor', monitorId],
		byIdFull: (monitorId: string) => ['monitorFull', monitorId],
		analtics: (monitorId: string, range: number, region: string) => [
			'monitorAnalytics',
			monitorId,
			range,
			region,
		],
		delete: (monitorId: string) => ['monitorDelete', monitorId],
	},
	region: {
		list: ['regionsList'],
	} as const,
	project: {
		all: ['projectsList'],
		byId: (projectId: string) => ['project', projectId],
		create: ['projectCreate'],
		update: (projectId: string) => ['projectUpdate', projectId],
		bySlug: (slug: string) => ['projectBySlug', slug],
		delete: (projectId: string) => ['projectDelete', projectId],
	} as const,
} as const;
