import { SiteStatus } from '@generated/engine/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class MonitorTimelineDto {
	@Expose() timestamp: Date;

	/** @example 100.000% */
	@Expose() uptime: string;

	@Expose()
	@ApiProperty({
		example: SiteStatus.UP,
		enum: SiteStatus,
		enumName: 'SiteStatus',
	})
	status: SiteStatus;
}
