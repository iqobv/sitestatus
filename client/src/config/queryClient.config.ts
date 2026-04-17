export const QUERY_KEYS = {
	auth: {
		login: ['login'],
		register: ['register'],
		refresh: ['refreshAuthToken'],
		logout: ['logout'],
		profile: ['profile'],
		verifyEmail: (userId: string, token: string) => [
			'verifyEmail',
			userId,
			token,
		],
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
	},
	region: {
		list: ['regionsList'],
	} as const,
	project: {
		all: ['projectsList'],
		byId: (projectId: string) => ['project', projectId],
	},
} as const;
