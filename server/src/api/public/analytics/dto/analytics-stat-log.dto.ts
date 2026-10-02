import { SiteStatus } from '@generated/engine/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AnalyticsStatLogDto {
	@Expose() uptimePercent: number;
	@Expose() avgResponseMs: number;
	@Expose() timestamp: Date;

	@Expose()
	@ApiProperty({
		example: SiteStatus.UP,
		enum: SiteStatus,
		enumName: 'SiteStatus',
	})
	status: SiteStatus;

	@Expose() regionId: string;
}
