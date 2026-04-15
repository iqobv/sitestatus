import { ApiProperty } from '@nestjs/swagger';
import { SiteStatus } from 'generated/prisma/enums';
import { BaseRegionDto } from '../../region/dto';

export class AnalyticsRawDataDto {
	@ApiProperty({ example: SiteStatus.UP, enum: SiteStatus })
	status: SiteStatus;

	@ApiProperty({ example: 143 })
	responseTimeMs: number;

	@ApiProperty({ example: null })
	errorMessage: string | null;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ type: BaseRegionDto })
	region: BaseRegionDto;
}
