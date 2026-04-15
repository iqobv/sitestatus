import {
	AnalyticsRawDataDto,
	AnalyticsStatLogDto,
} from 'src/api/public/analytics/dto';

export type CalculateLogs = AnalyticsRawDataDto[] | AnalyticsStatLogDto[];
export type CalculateLog = AnalyticsRawDataDto | AnalyticsStatLogDto;
