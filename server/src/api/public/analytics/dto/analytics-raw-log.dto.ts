import { ApiProperty } from '@nestjs/swagger';
import { SiteStatus } from 'generated/prisma/enums';

export class AnalyticsRowDataDto {
	@ApiProperty({ example: SiteStatus.UP, enum: SiteStatus })
	status: SiteStatus;

	@ApiProperty({ example: 143 })
	responseTimeMs: number;

	@ApiProperty({ example: null })
	errorMessage: string | null;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: '1e06a622-a566-43b5-89ac-ab1d71696cd8' })
	regionId: string;
}
