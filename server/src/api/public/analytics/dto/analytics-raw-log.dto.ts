import { SiteStatus } from '@generated/turso/enums';
import { ApiProperty } from '@nestjs/swagger';

export class AnalyticsRawDataDto {
	@ApiProperty({ example: SiteStatus.UP, enum: SiteStatus })
	status: SiteStatus;

	@ApiProperty({ example: 143 })
	responseTimeMs: number;

	@ApiProperty({ example: null })
	errorMessage: string | null;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: '8430dc88-35ec-408d-b888-cf871a9b2375' })
	regionId: string;
}
