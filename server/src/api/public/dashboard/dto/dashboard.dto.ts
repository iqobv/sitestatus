import { IncidentDto } from '@api/public/incident/dto';
import { BaseMonitorDto } from '@api/public/monitor/dto';
import { ProjectDto } from '@api/public/project/dto';
import { StatusPageDto } from '@api/public/status-page/dto';
import { ApiProperty } from '@nestjs/swagger';

export class DashboardIncidentDto extends IncidentDto {
	@ApiProperty({ type: BaseMonitorDto })
	monitor: BaseMonitorDto | null;
}

export class DashboardDto {
	@ApiProperty({ type: [BaseMonitorDto] })
	monitors: BaseMonitorDto[];

	@ApiProperty({ type: [DashboardIncidentDto] })
	incidents: DashboardIncidentDto[];

	@ApiProperty({ type: [StatusPageDto] })
	statusPages: StatusPageDto[];

	@ApiProperty({ type: [ProjectDto] })
	projects: ProjectDto[];
}
