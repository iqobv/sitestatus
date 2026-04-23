import {
	AnalyticsRawDataDto,
	AnalyticsStatLogDto,
} from '@api/public/analytics/dto';

export type CalculateLogs = AnalyticsRawDataDto[] | AnalyticsStatLogDto[];
export type CalculateLog = AnalyticsRawDataDto | AnalyticsStatLogDto;
