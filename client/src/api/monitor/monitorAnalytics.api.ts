import { MonitorAnalytics } from '@/types';
import { apiClient } from '../axios';

export const getMonitorAnalytics = async (
	monitorId: string,
	daysRange: number = 1,
	region: string = 'global',
) =>
	(
		await apiClient.get<MonitorAnalytics>(`/v1/analytics/${monitorId}`, {
			params: {
				daysRange,
				region,
			},
		})
	).data;
