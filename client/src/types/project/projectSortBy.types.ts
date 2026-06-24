export const ProjectSortBy = {
	name: 'name',
	createdAt: 'createdAt',
} as const;

export type ProjectSortBy = (typeof ProjectSortBy)[keyof typeof ProjectSortBy];
