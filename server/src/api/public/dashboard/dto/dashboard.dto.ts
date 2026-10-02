import { IncidentDto } from '@api/public/incident/dto/incident.dto';
import { BaseMonitorDto } from '@api/public/monitor/dto/monitor.dto';
import { ProjectDto } from '@api/public/project/dto/project.dto';
import { StatusPageDto } from '@api/public/status-page/dto/status-page.dto';
import { Expose, Type } from 'class-transformer';

export class DashboardIncidentDto extends IncidentDto {
	@Expose()
	@Type(() => BaseMonitorDto)
	monitor: BaseMonitorDto | null;
}

export class DashboardDto {
	@Expose()
	@Type(() => BaseMonitorDto)
	monitors: BaseMonitorDto[];

	@Expose()
	@Type(() => DashboardIncidentDto)
	incidents: DashboardIncidentDto[];

	@Expose()
	@Type(() => StatusPageDto)
	statusPages: StatusPageDto[];

	@Expose()
	@Type(() => ProjectDto)
	projects: ProjectDto[];
}
