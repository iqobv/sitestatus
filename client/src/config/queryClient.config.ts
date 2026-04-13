export const QUERY_KEYS = {
	auth: {
		login: ['login'] as const,
		register: ['register'] as const,
		refresh: ['refreshAuthToken'] as const,
		logout: ['logout'] as const,
		profile: ['profile'] as const,
		verifyEmail: (userId: string, token: string) =>
			['verifyEmail', userId, token] as const,
		resendVerificationEmail: (email: string) =>
			['resendVerificationEmail', email] as const,
	},
	monitors: {
		list: ['monitorsList'] as const,
		byId: (monitorId: string) => ['monitor', monitorId] as const,
		analtics: (monitorId: string, range: number, region: string) =>
			['monitorAnalytics', monitorId, range, region] as const,
	},
} as const;
