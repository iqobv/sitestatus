import { PaginatedDataDto } from '@libs/dto/paginated-data.dto';
import { Expose, Type } from 'class-transformer';
import { ProjectDto } from './project.dto';

export class PaginatedProjectsDto extends PaginatedDataDto<ProjectDto> {
	@Expose()
	@Type(() => ProjectDto)
	declare data: ProjectDto[];
}
