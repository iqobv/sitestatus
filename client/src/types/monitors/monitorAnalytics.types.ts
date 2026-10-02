import { getMonitorAnalytics } from '@/api/monitor/monitorAnalytics.api';
import { components } from '../schema';

export type AnalyticsStatData = components['schemas']['AnalyticsStatLogDto'];
export type AnalyticsRawData = components['schemas']['AnalyticsRawDataDto'];

export type AnalyticsData = AnalyticsRawData | AnalyticsStatData;

export type MonitorAnalytics = Awaited<ReturnType<typeof getMonitorAnalytics>>;
