import { IncidentDto } from '@api/public/incident/dto';
import { StatPeriod } from '@generated/turso/enums';
import { ApiProperty } from '@nestjs/swagger';
import { AnalyticsRawDataDto } from './analytics-raw-log.dto';
import { AnalyticsStatLogDto } from './analytics-stat-log.dto';
import { AnalyticsStatisticsDto } from './analytics-statistics.dto';

const PeriodEnum = {
	...StatPeriod,
	RAW: 'RAW',
} as const;

type Period = (typeof PeriodEnum)[keyof typeof PeriodEnum];

export class AnalyticsDto {
	@ApiProperty({ example: StatPeriod.HOURLY, enum: PeriodEnum })
	period: Period;

	@ApiProperty({ type: AnalyticsStatisticsDto })
	statistics: AnalyticsStatisticsDto;

	@ApiProperty({ type: [IncidentDto] })
	incidents: IncidentDto[];

	@ApiProperty({ type: AnalyticsStatLogDto })
	data: AnalyticsRawDataDto | AnalyticsStatLogDto;
}
