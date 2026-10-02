import { components } from '../schema';

type SwaggerSortBy = components['schemas']['MonitorSortField'];

export const MonitorSortBy = {
	name: 'name',
	createdAt: 'createdAt',
} as const satisfies Record<SwaggerSortBy, SwaggerSortBy>;

export type MonitorSortBy = (typeof MonitorSortBy)[keyof typeof MonitorSortBy];
