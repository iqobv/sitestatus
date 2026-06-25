export const MonitorSortBy = {
	name: 'name',
	createdAt: 'createdAt',
} as const;

export type MonitorSortBy = (typeof MonitorSortBy)[keyof typeof MonitorSortBy];
