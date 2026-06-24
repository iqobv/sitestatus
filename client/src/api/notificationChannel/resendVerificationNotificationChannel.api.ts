import { ApiMessageResponse } from '@/types/api/messageResponse.api';
import { apiClient } from '../axios';

export const resendVerificationNotificationChannel = async (id: string) =>
	(
		await apiClient.post<ApiMessageResponse>(
			`/v1/notification-channels/resend-verification-email/${id}`,
		)
	).data;
