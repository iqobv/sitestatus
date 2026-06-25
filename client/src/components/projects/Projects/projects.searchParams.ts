import { ProjectsQueryDto } from '@/dto/project.dto';
import { SortOrder } from '@/types/api/sortOrder.types';
import { StrictParsersMap } from '@/types/parserMap.types';
import { ProjectSortBy } from '@/types/project/projectSortBy.types';
import { createTableParsers } from '@/utils/tableUrlParser.util';
import { createSearchParamsCache } from 'nuqs/server';

export const projectFiltersParsers = createTableParsers(
	ProjectSortBy,
	ProjectSortBy.createdAt,
	SortOrder,
	SortOrder.desc,
) satisfies StrictParsersMap<ProjectsQueryDto>;

export const projectFiltersSearchParamsCache = createSearchParamsCache(
	projectFiltersParsers,
);
