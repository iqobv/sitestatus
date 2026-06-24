import { ApiMessageResponse } from '@/types/api/messageResponse.api';
import { apiClient } from '../axios';

export const markAllNotificationAsRead = async () =>
	(
		await apiClient.post<ApiMessageResponse>(
			'/v1/notifications/mark-all-as-read',
		)
	).data;
