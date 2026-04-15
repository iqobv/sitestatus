import { ApiProperty } from '@nestjs/swagger';
import { SiteStatus } from 'generated/prisma/enums';
import { BaseRegionDto } from '../../region/dto';

export class AnalyticsStatLogDto {
	@ApiProperty({ example: 100 })
	uptimePercent: number;

	@ApiProperty({ example: 209 })
	avgResponseMs: number;

	@ApiProperty({ example: new Date() })
	timestamp: Date;

	@ApiProperty({ example: SiteStatus.UP, enum: SiteStatus })
	status: SiteStatus;

	@ApiProperty({ type: BaseRegionDto })
	region: BaseRegionDto;
}
