import { StatusPagesQueryDto } from '@/dto/statusPage.dto';
import { SortOrder } from '@/types/api/sortOrder.types';
import { StrictParsersMap } from '@/types/parserMap.types';
import { StatusPagesSortBy } from '@/types/statusPage/monitorSortBy.types';
import { createTableParsers } from '@/utils/tableUrlParser.util';
import { createSearchParamsCache } from 'nuqs/server';

export const statusPagesFiltersParsers = createTableParsers(
	StatusPagesSortBy,
	StatusPagesSortBy.createdAt,
	SortOrder,
	SortOrder.desc,
) satisfies StrictParsersMap<StatusPagesQueryDto>;

export const statusPagesFiltersSearchParamsCache = createSearchParamsCache(
	statusPagesFiltersParsers,
);
