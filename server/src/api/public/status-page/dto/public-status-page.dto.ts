import { MonitorTimelineDto } from '@api/public/monitor/dto';
import { SiteStatus } from '@generated/turso/enums';
import { ApiProperty } from '@nestjs/swagger';

export class PublicMonitorDto {
	@ApiProperty({ example: 'monitor-1' })
	id: string;
}

export class PublicStatusPageMonitorsDto {
	@ApiProperty({ example: 'monitor-1' })
	id: string;

	@ApiProperty({ example: 'Monitor 1' })
	displayName: string;

	@ApiProperty({ example: 0 })
	sortOrder: number;

	@ApiProperty({ example: 'monitor-1' })
	monitorId: string;

	@ApiProperty({ example: SiteStatus.UP, enum: SiteStatus })
	lastStatus: SiteStatus;

	@ApiProperty({ example: '100.000%' })
	uptime: string;

	@ApiProperty({ type: [MonitorTimelineDto] })
	timeline: MonitorTimelineDto[];
}

export class PublicStatusPageDto {
	@ApiProperty({ example: 'status-page-1' })
	id: string;

	@ApiProperty({ example: 'my-website-status' })
	slug: string;

	@ApiProperty({ example: 'My Website Status' })
	title: string;

	@ApiProperty({ example: 'This is a status page for my website.' })
	description: string | null;
}
