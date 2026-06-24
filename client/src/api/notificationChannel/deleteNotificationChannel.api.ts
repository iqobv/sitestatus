import { ApiMessageResponse } from '@/types/api/messageResponse.api';
import { apiClient } from '../axios';

export const deleteNotificationChannel = async (id: string) =>
	(
		await apiClient.delete<ApiMessageResponse>(
			`/v1/notification-channels/${id}`,
		)
	).data;
