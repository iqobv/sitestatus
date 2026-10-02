import { Expose } from 'class-transformer';

export class AnalyticsStatisticsResponseDto {
	@Expose() min: number;
	@Expose() max: number;
	@Expose() avg: number;
}
