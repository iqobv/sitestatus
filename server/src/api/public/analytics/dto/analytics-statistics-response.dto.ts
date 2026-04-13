import { ApiProperty } from '@nestjs/swagger';

export class AnalyticsStatisticsResponseDto {
	@ApiProperty({ example: 100 })
	min: number;

	@ApiProperty({ example: 200 })
	max: number;

	@ApiProperty({ example: 150 })
	avg: number;
}
