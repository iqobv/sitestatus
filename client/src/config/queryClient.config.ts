export const QUERY_KEYS = {
	auth: {
		login: ['login'] as const,
		register: ['register'] as const,
		refresh: ['refreshAuthToken'] as const,
		logout: ['logout'] as const,
		profile: (token: string) => ['profile', token] as const,
		verifyEmail: (userId: string, token: string) =>
			['verifyEmail', userId, token] as const,
	},
} as const;
