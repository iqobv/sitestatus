import { MonitorFullDto } from '@api/public/monitor/dto';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectDto } from './project.dto';

export class PublicProjectDto extends ProjectDto {
	@ApiProperty({ type: [MonitorFullDto] })
	monitors: MonitorFullDto[];
}
