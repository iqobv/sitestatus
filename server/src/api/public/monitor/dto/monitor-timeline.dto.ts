import { ApiProperty } from '@nestjs/swagger';
import { SiteStatus } from 'generated/prisma/enums';

export class MonitorTimelineDto {
	@ApiProperty({ example: new Date() })
	timestamp: Date;

	@ApiProperty({ example: SiteStatus.UP, enum: SiteStatus })
	status: SiteStatus;
}
