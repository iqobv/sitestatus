import { components } from '../schema';

type SwaggerSortBy = components['schemas']['ProjectSortField'];

export const ProjectSortBy = {
	name: 'name',
	createdAt: 'createdAt',
} as const satisfies Record<SwaggerSortBy, SwaggerSortBy>;

export type ProjectSortBy = (typeof ProjectSortBy)[keyof typeof ProjectSortBy];
