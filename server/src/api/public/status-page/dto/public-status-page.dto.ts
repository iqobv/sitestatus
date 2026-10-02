import { MonitorTimelineDto } from '@api/public/monitor/dto/monitor-timeline.dto';
import { SiteStatus } from '@generated/engine/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class PublicMonitorDto {
	@Expose() id: string;
}

export class PublicStatusPageMonitorsDto {
	@Expose() id: string;
	@Expose() displayName: string;
	@Expose() sortOrder: number;
	@Expose() monitorId: string;

	@Expose()
	@ApiProperty({
		example: SiteStatus.UP,
		enum: SiteStatus,
		enumName: 'SiteStatus',
	})
	lastStatus: SiteStatus;

	@Expose() uptime: string;

	@Type(() => MonitorTimelineDto)
	@Expose()
	timeline: MonitorTimelineDto[];
}

export class PublicStatusPageDto {
	@Expose() id: string;
	@Expose() slug: string;
	@Expose() title: string;
	@Expose() description: string | null;
}
