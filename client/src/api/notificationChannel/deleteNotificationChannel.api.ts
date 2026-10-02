import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type DeleteNotificationChannelResponse =
	paths['/v1/notification-channels/{id}']['delete']['responses']['200']['content']['application/json'];

export const deleteNotificationChannel = async (id: string) =>
	(
		await apiClient.delete<DeleteNotificationChannelResponse>(
			`/v1/notification-channels/${id}`,
		)
	).data;
