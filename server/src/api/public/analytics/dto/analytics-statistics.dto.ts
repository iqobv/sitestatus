import { Expose, Type } from 'class-transformer';
import { AnalyticsStatisticsResponseDto } from './analytics-statistics-response.dto';

export class AnalyticsStatisticsDto {
	@Expose() p95: number;
	@Expose() uptime: string;
	@Expose() errorRate: string;

	@Expose()
	@Type(() => AnalyticsStatisticsResponseDto)
	responseTime: AnalyticsStatisticsResponseDto;
}
