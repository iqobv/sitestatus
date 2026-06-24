import { SortOrder } from '@/types/api/sortOrder.types';
import { StatusPagesSortBy } from '@/types/statusPage/monitorSortBy.types';
import { createBaseQuerySortingSchema } from '../ui/baseSorting.schema';
import { tablePaginationSchema } from '../ui/tablePagination.schema';

export const baseStatusPagesQuerySchema = createBaseQuerySortingSchema(
	StatusPagesSortBy,
	StatusPagesSortBy.createdAt,
	SortOrder,
	SortOrder.desc,
);

export const statusPagesQuerySchema = tablePaginationSchema.and(
	baseStatusPagesQuerySchema,
);
