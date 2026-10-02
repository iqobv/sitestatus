import { ProjectsQueryDto } from '@/dto/project.dto';
import { SortOrder } from '@/types/api/sortOrder.types';
import { StrictParsersMap } from '@/types/parserMap.types';
import { ProjectSortBy } from '@/types/project/projectSortBy.types';
import { createTableParsers } from '@/utils/tableUrlParser.util';
import { parseAsString } from 'nuqs';

export const projectFiltersParsers = {
	...createTableParsers(
		ProjectSortBy,
		ProjectSortBy.createdAt,
		SortOrder,
		SortOrder.desc,
	),
	search: parseAsString.withDefault(''),
} satisfies StrictParsersMap<ProjectsQueryDto>;
