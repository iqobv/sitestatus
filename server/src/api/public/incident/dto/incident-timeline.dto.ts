import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
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
		enumName: 'IncidentTimelineType',
	})
	@Expose()
	@IsEnum(IncidentTimelineType)
	type: IncidentTimelineType;

	@Expose()
	@IsDate()
	timestamp: Date;

	@Expose()
	@IsString()
	metadata: string;
}
