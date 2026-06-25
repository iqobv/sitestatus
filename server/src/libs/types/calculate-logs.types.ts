import { AnalyticsRawDataDto } from '@api/public/analytics/dto/analytics-raw-log.dto';
import { AnalyticsStatLogDto } from '@api/public/analytics/dto/analytics-stat-log.dto';

export type CalculateLogs = AnalyticsRawDataDto[] | AnalyticsStatLogDto[];
export type CalculateLog = AnalyticsRawDataDto | AnalyticsStatLogDto;
