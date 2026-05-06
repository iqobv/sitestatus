import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';

export class IncidentDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'monitor-1' })
	monitorId: string;

	@ApiProperty({ example: 'region-1' })
	regionId: string;

	@ApiProperty({ example: 'log-1' })
	triggerLogId: string;

	@ApiProperty({ example: 'Error message' })
	errorMessage: string | null;

	@ApiProperty({ example: 500 })
	statusCode: number | null;

	@ApiProperty({ example: true })
	resolved: boolean;

	@ApiProperty({ example: new Date() })
	resolvedAt: Date | null;

	@ApiProperty({ example: true })
	alertTriggered: boolean;

	@ApiProperty({ example: new Date() })
	alertSentAt: Date | null;
}
