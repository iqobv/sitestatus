import { SortOrder } from '@/types/api/sortOrder.types';
import { MonitorSortBy } from '@/types/monitors/monitorSortBy.types';
import { createBaseQuerySortingSchema } from '../ui/baseSorting.schema';
import { tablePaginationSchema } from '../ui/tablePagination.schema';

export const baseMonitorsQuerySchema = createBaseQuerySortingSchema(
	MonitorSortBy,
	MonitorSortBy.createdAt,
	SortOrder,
	SortOrder.desc,
);

export const monitorsQuerySchema = tablePaginationSchema.and(
	baseMonitorsQuerySchema,
);
