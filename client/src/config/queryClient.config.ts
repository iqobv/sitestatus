export const QUERY_KEYS = {
	auth: {
		login: ['login'] as const,
		register: ['register'] as const,
		refresh: ['refreshAuthToken'] as const,
		logout: ['logout'] as const,
		profile: (userId: string) => ['profile', userId] as const,
		verifyEmail: (userId: string, token: string) =>
			['verifyEmail', userId, token] as const,
		resendVerificationEmail: (email: string) =>
			['resendVerificationEmail', email] as const,
	},
	monitors: {
		list: (userId: string) => ['monitors-list', userId] as const,
		byId: (monitorId: string) => ['monitor', monitorId] as const,
	},
} as const;
