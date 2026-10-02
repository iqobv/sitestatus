import { SiteStatus } from '@generated/engine/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AnalyticsRawDataDto {
	@Expose() responseTimeMs: number;
	@Expose() errorMessage: string | null;
	@Expose() createdAt: Date;
	@Expose() regionId: string;

	@Expose()
	@ApiProperty({
		example: SiteStatus.UP,
		enum: SiteStatus,
		enumName: 'SiteStatus',
	})
	status: SiteStatus;
}
