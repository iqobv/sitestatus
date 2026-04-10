import { ApiProperty } from '@nestjs/swagger';
import { AnalyticsStatisticsResponseDto } from './analytics-statistics-response.dto';

export class AnalyticsStatisticsDto {
	@ApiProperty({ example: 95 })
	p95: number;

	@ApiProperty({ example: '97.655%' })
	uptime: string;

	@ApiProperty({ example: '2.345%' })
	errorRate: string;

	@ApiProperty({ type: AnalyticsStatisticsResponseDto })
	responseTime: AnalyticsStatisticsResponseDto;
}
