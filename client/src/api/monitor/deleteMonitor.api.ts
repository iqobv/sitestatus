import { ApiMessageResponse } from '@/types/api/messageResponse.api';
import { apiClient } from '../axios';

export const deleteMonitor = async (monitorId: string) =>
	(await apiClient.delete<ApiMessageResponse>(`/v1/monitors/${monitorId}`))
		.data;
