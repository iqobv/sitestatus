import { ApiProperty } from '@nestjs/swagger';
import { SiteStatus } from 'generated/prisma/enums';

export class AnalyticsStatLogDto {
	@ApiProperty({ example: 100 })
	uptimePercent: number;

	@ApiProperty({ example: 209 })
	avgResponseMs: number;

	@ApiProperty({ example: new Date() })
	timestamp: Date;

	@ApiProperty({ example: '84933233-90a7-4624-a03e-cfcd202954a4' })
	regionId: string;

	@ApiProperty({ example: SiteStatus.UP, enum: SiteStatus })
	status: SiteStatus;
}
