import { SiteStatus } from '@generated/turso/enums';
import { ApiProperty } from '@nestjs/swagger';

export class AnalyticsStatLogDto {
	@ApiProperty({ example: 100 })
	uptimePercent: number;

	@ApiProperty({ example: 209 })
	avgResponseMs: number;

	@ApiProperty({ example: new Date() })
	timestamp: Date;

	@ApiProperty({ example: SiteStatus.UP, enum: SiteStatus })
	status: SiteStatus;

	@ApiProperty({ example: '8430dc88-35ec-408d-b888-cf871a9b2375' })
	regionId: string;
}
