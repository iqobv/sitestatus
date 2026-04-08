import { ApiProperty } from '@nestjs/swagger';
import { StatPeriod } from 'generated/prisma/enums';
import { AnalyticsRowDataDto } from './analytics-raw-log.dto';
import { AnalyticsStatLogDto } from './analytics-stat-log.dto';

const PeriodEnum = {
	...StatPeriod,
	RAW: 'RAW',
} as const;

type Period = (typeof PeriodEnum)[keyof typeof PeriodEnum];

export class AnalyticsDto {
	@ApiProperty({ example: StatPeriod.HOURLY, enum: PeriodEnum })
	period: Period;

	@ApiProperty({ type: AnalyticsStatLogDto })
	data: AnalyticsRowDataDto | AnalyticsStatLogDto;
}
