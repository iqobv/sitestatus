import { createDataQuery } from '@libs/dto/data-query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

const SortField = {
	name: 'name',
	createdAt: 'createdAt',
} as const;
type SortField = (typeof SortField)[keyof typeof SortField];

export class ProjectsQueryDto extends createDataQuery(
	SortField,
	'ProjectSortField',
) {
	@ApiPropertyOptional({
		example: 'search term',
	})
	@IsString()
	@IsOptional()
	search?: string;
}
