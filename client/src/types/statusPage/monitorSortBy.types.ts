import { components } from '../schema';

type SwaggerSortBy = components['schemas']['StatusPagesSortField'];

export const StatusPagesSortBy = {
	title: 'title',
	slug: 'slug',
	createdAt: 'createdAt',
} as const satisfies Record<SwaggerSortBy, SwaggerSortBy>;

export type StatusPagesSortBy =
	(typeof StatusPagesSortBy)[keyof typeof StatusPagesSortBy];
