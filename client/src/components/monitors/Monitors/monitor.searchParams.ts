import { MonitorsQueryDto } from '@/dto/monitor.dto';
import { SortOrder } from '@/types/api/sortOrder.types';
import { MonitorSortBy } from '@/types/monitors/monitorSortBy.types';
import { StrictParsersMap } from '@/types/parserMap.types';
import { createTableParsers } from '@/utils/tableUrlParser.util';
import { createSearchParamsCache } from 'nuqs/server';

export const monitorFiltersParsers = createTableParsers(
	MonitorSortBy,
	MonitorSortBy.createdAt,
	SortOrder,
	SortOrder.desc,
) satisfies StrictParsersMap<MonitorsQueryDto>;

export const monitorFiltersSearchParamsCache = createSearchParamsCache(
	monitorFiltersParsers,
);
