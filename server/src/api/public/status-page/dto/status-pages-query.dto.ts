import { createDataQuery } from '@libs/dto/data-query.dto';

const SortField = {
	title: 'title',
	slug: 'slug',
	createdAt: 'createdAt',
} as const;
type SortField = (typeof SortField)[keyof typeof SortField];

export class StatusPagesQueryDto extends createDataQuery(
	SortField,
	'StatusPagesSortField',
) {}
