import { AnalyticsData, AnalyticsRawData } from '@/types';

export const isRawData = (log: AnalyticsData): log is AnalyticsRawData => {
	return 'responseTimeMs' in log && 'createdAt' in log;
};
