import { SiteStatus } from '@generated/turso/enums';
import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';
import { BaseRegionDto } from '../../region/dto';
import { MonitorTimelineDto } from './monitor-timeline.dto';

export class BaseMonitorDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'My Website' })
	name: string;

	@ApiProperty({ example: 'https://example.com' })
	url: string;

	@ApiProperty({ example: 300, description: 'Check interval in seconds' })
	checkIntervalSeconds: number;

	@ApiProperty({ example: 'GET' })
	method: string;

	@ApiProperty({ example: true })
	isActive?: boolean;

	@ApiProperty({ example: 'f77d8a89-3af8-43d3-91d2-47348ec2ac45' })
	projectId: string | null;
}

export class MonitorDto extends BaseMonitorDto {
	@ApiProperty({ example: new Date().toISOString() })
	nextCheckAt: Date;

	@ApiProperty({ example: new Date().toISOString() })
	lastCheckedAt?: Date;

	@ApiProperty({ example: SiteStatus.UP })
	lastStatus?: SiteStatus;

	@ApiProperty({ example: '100.000%' })
	uptime: string;
}

export class MonitorFullDto extends MonitorDto {
	@ApiProperty({ type: [MonitorTimelineDto] })
	timeline: MonitorTimelineDto[];
}

export class MonitorWithRegionsDto extends MonitorFullDto {
	@ApiProperty({ type: [BaseRegionDto] })
	regions: BaseRegionDto[];
}

export class MonitorWithRegionsIdsDto extends MonitorDto {
	@ApiProperty({
		example: [
			'70798955-3cd6-405a-8474-fcd6bbbfbf91',
			'9002bfe9-f561-4b7d-b418-2fd3dea04474',
		],
	})
	regions: string[];
}
