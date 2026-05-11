import { NotificationChannel } from '@/types';
import { apiClient } from '../axios';

export const getAllNotificationChannels = async () =>
	(await apiClient.get<NotificationChannel[]>('/v1/notification-channels'))
		.data;
