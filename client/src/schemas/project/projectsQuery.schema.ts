import { SortOrder } from '@/types/api/sortOrder.types';
import { ProjectSortBy } from '@/types/project/projectSortBy.types';
import { z } from 'zod';
import { createBaseQuerySortingSchema } from '../ui/baseSorting.schema';
import { tablePaginationSchema } from '../ui/tablePagination.schema';

export const baseProjectsQuerySchema = createBaseQuerySortingSchema(
	ProjectSortBy,
	ProjectSortBy.createdAt,
	SortOrder,
	SortOrder.desc,
);

const searchSchema = z.object({
	search: z.string().optional(),
});

export const projectsQuerySchema = tablePaginationSchema
	.and(baseProjectsQuerySchema)
	.and(searchSchema);
