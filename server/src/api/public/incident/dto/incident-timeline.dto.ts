import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsString } from 'class-validator';

export const IncidentTimelineType = {
	CREATED: 'CREATED',
	ALERTED: 'ALERTED',
	RESOLVED: 'RESOLVED',
} as const;

export type IncidentTimelineType =
	(typeof IncidentTimelineType)[keyof typeof IncidentTimelineType];

export class IncidentTimelineDto {
	@ApiProperty({
		example: IncidentTimelineType.CREATED,
		enum: IncidentTimelineType,
	})
	@IsEnum(IncidentTimelineType)
	type: IncidentTimelineType;

	@ApiProperty({ example: new Date() })
	@IsDate()
	timestamp: Date;

	@ApiProperty({ example: 'region-1' })
	@IsString()
	metadata: string;
}
