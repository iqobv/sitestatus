import { AnalyticsRawData } from '@/types/monitors/analyticsRawData.types';
import { AnalyticsData } from '@/types/monitors/monitorAnalytics.types';

export const isRawData = (log: AnalyticsData): log is AnalyticsRawData => {
	return 'responseTimeMs' in log && 'createdAt' in log;
};
