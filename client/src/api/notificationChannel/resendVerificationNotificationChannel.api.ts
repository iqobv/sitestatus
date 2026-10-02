import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type ResendVerificationNotificationChannelResponse =
	paths['/v1/notification-channels/resend-verification-email/{id}']['post']['responses']['200']['content']['application/json'];

export const resendVerificationNotificationChannel = async (id: string) =>
	(
		await apiClient.post<ResendVerificationNotificationChannelResponse>(
			`/v1/notification-channels/resend-verification-email/${id}`,
		)
	).data;
