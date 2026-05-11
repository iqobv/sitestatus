import { ApiMessageResponse } from '@/types';
import { apiClient } from '../axios';

export const resendVerificationNotificationChannel = async (id: string) =>
	(
		await apiClient.post<ApiMessageResponse>(
			`/v1/notification-channels/resend-verification-email/${id}`,
		)
	).data;
