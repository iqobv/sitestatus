import { ApiProperty } from '@nestjs/swagger';

export class AnalyticsIncidentDto {
	@ApiProperty({ example: 'incident-1' })
	id: string;

	@ApiProperty({ example: 'monitor-1' })
	monitorId: string;

	@ApiProperty({ example: 'region-1' })
	regionId: string;

	@ApiProperty({ example: 200 })
	statusCode: number | null;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: 'Error message' })
	errorMessage: string | null;

	@ApiProperty({ example: true })
	resolved: boolean;

	@ApiProperty({ example: new Date() })
	resolvedAt: Date | null;

	@ApiProperty({ example: true })
	alertTriggered: boolean;

	@ApiProperty({ example: new Date() })
	alertSentAt: Date | null;
}
