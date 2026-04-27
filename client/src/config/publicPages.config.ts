export const PUBLIC_PAGES = {
	HOME: '/',
	PUBLIC_PROJECT: (slug: string) => `/p/${slug}`,
} as const;
