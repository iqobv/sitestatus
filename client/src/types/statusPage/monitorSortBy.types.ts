export const StatusPagesSortBy = {
	title: 'title',
	slug: 'slug',
	createdAt: 'createdAt',
} as const;

export type StatusPagesSortBy =
	(typeof StatusPagesSortBy)[keyof typeof StatusPagesSortBy];
