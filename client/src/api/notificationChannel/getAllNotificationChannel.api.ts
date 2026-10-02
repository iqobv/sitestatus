import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetAllNotificationChannelsResponse =
	paths['/v1/notification-channels']['get']['responses']['200']['content']['application/json'];

export const getAllNotificationChannels = async () =>
	(
		await apiClient.get<GetAllNotificationChannelsResponse>(
			'/v1/notification-channels',
		)
	).data;
