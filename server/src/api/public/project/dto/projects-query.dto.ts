import { createDataQuery } from '@libs/dto/data-query.dto';

const SortField = {
	name: 'name',
	createdAt: 'createdAt',
} as const;
type SortField = (typeof SortField)[keyof typeof SortField];

export class ProjectsQueryDto extends createDataQuery(
	SortField,
	'ProjectSortField',
) {}
