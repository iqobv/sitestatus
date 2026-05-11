import { SiteStatus } from '@generated/turso/enums';
import { ApiProperty } from '@nestjs/swagger';

export class MonitorTimelineDto {
	@ApiProperty({ example: new Date() })
	timestamp: Date;

	@ApiProperty({ example: '100.000%' })
	uptime: string;

	@ApiProperty({ example: SiteStatus.UP, enum: SiteStatus })
	status: SiteStatus;
}
