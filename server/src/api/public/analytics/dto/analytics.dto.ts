import { IncidentDto } from '@api/public/incident/dto/incident.dto';
import { StatPeriod } from '@generated/engine/enums';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { AnalyticsRawDataDto } from './analytics-raw-log.dto';
import { AnalyticsStatLogDto } from './analytics-stat-log.dto';
import { AnalyticsStatisticsDto } from './analytics-statistics.dto';

const Period = {
	...StatPeriod,
	RAW: 'RAW',
} as const;

type Period = (typeof Period)[keyof typeof Period];

@ApiExtraModels(AnalyticsRawDataDto, AnalyticsStatLogDto)
export class AnalyticsDto {
	@Expose()
	@ApiProperty({
		example: Period.HOURLY,
		enum: Period,
		enumName: 'Period',
	})
	period: Period;

	@Expose()
	@Type(() => AnalyticsStatisticsDto)
	statistics: AnalyticsStatisticsDto;

	@Expose()
	@Type(() => IncidentDto)
	incidents: IncidentDto[];

	@Expose()
	@ApiProperty({
		isArray: true,
		oneOf: [
			{ $ref: getSchemaPath(AnalyticsRawDataDto) },
			{ $ref: getSchemaPath(AnalyticsStatLogDto) },
		],
	})
	@Type((options) => {
		const parentPeriod = (options?.object as AnalyticsDto)?.period;

		if (parentPeriod === Period.RAW) return AnalyticsRawDataDto;

		return AnalyticsStatLogDto;
	})
	data: AnalyticsRawDataDto[] | AnalyticsStatLogDto[];
}
