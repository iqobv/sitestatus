import { ApiProperty } from '@nestjs/swagger';
import { SiteStatus } from 'generated/prisma/enums';

export class PingResultDto {
	@ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
	id: string;
	@ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
	monitorId: string;
	@ApiProperty({ example: SiteStatus.UP, enum: SiteStatus })
	status: SiteStatus;
	@ApiProperty({ example: 200, description: 'HTTP status code' })
	statusCode: number | null;
	@ApiProperty({ example: 123, description: 'Response time in milliseconds' })
	responseTimeMs: number | null;
	@ApiProperty({ example: null, description: 'Error message if any' })
	errorMessage: string | null;
	@ApiProperty({ example: new Date().toISOString() })
	checkedAt: Date;
	@ApiProperty({ example: new Date().toISOString() })
	createdAt: Date;
	@ApiProperty({ example: new Date().toISOString() })
	updatedAt: Date;
}
