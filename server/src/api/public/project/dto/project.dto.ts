import { MonitorFullDto } from '@api/public/monitor/dto/monitor.dto';
import { OmitType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ProjectEntityDto } from './project.entity.dto';

export class ProjectDto extends OmitType(ProjectEntityDto, [
	'monitors',
] as const) {}

export class ProjectWithMonitorsDto extends ProjectEntityDto {}

export class PublicProjectDto extends ProjectDto {
	@Expose()
	@Type(() => MonitorFullDto)
	monitors: MonitorFullDto[];
}
