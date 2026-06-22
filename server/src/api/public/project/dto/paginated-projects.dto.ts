import { PaginatedDataDto } from '@libs/dto/paginated-data.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProjectDto } from './project.dto';

export class PaginatedProjectsDto extends PaginatedDataDto<ProjectDto> {
	@ApiProperty({ type: [ProjectDto] })
	@Type(() => ProjectDto)
	declare data: ProjectDto[];
}
