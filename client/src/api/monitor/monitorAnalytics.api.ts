import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetMonitorAnalyticsResponse =
	paths['/v1/analytics/{monitorId}']['get']['responses']['200']['content']['application/json'];

export const getMonitorAnalytics = async (
	monitorId: string,
	daysRange: number = 1,
	region: string = 'global',
) =>
	(
		await apiClient.get<GetMonitorAnalyticsResponse>(
			`/v1/analytics/${monitorId}`,
			{
				params: {
					daysRange,
					region,
				},
			},
		)
	).data;
