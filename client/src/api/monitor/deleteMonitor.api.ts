import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type DeleteMonitorResponse =
	paths['/v1/monitors/{id}']['delete']['responses']['200']['content']['application/json'];

export const deleteMonitor = async (monitorId: string) =>
	(await apiClient.delete<DeleteMonitorResponse>(`/v1/monitors/${monitorId}`))
		.data;
