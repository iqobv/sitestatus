import { IncidentDto } from '@api/public/incident/dto/incident.dto';
import { StatPeriod } from '@generated/engine/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { AnalyticsRawDataDto } from './analytics-raw-log.dto';
import { AnalyticsStatLogDto } from './analytics-stat-log.dto';
import { AnalyticsStatisticsDto } from './analytics-statistics.dto';

const PeriodEnum = {
	...StatPeriod,
	RAW: 'RAW',
} as const;

type Period = (typeof PeriodEnum)[keyof typeof PeriodEnum];

export class AnalyticsDto {
	@Expose()
	@ApiProperty({
		example: StatPeriod.HOURLY,
		enum: PeriodEnum,
		enumName: 'StatPeriod',
	})
	period: Period;

	@Expose()
	@Type(() => AnalyticsStatisticsDto)
	statistics: AnalyticsStatisticsDto;

	@Expose()
	@Type(() => IncidentDto)
	incidents: IncidentDto[];

	@Expose()
	@Type(() => AnalyticsRawDataDto || AnalyticsStatLogDto)
	data: AnalyticsRawDataDto[] | AnalyticsStatLogDto[];
}
