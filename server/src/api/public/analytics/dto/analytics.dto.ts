import { ApiProperty } from '@nestjs/swagger';
import { StatPeriod } from 'generated/prisma/enums';
import { AnalyticsAccidentDto } from './analytics-accident.dto';
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

	@ApiProperty({ type: [AnalyticsAccidentDto] })
	accidents: AnalyticsAccidentDto[];

	@ApiProperty({ type: AnalyticsStatLogDto })
	data: AnalyticsRawDataDto | AnalyticsStatLogDto;
}
