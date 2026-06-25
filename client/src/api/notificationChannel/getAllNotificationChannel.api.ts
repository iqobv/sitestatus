import { NotificationChannel } from '@/types/notificationChannel/notificationChannel.types';
import { apiClient } from '../axios';

export const getAllNotificationChannels = async () =>
	(await apiClient.get<NotificationChannel[]>('/v1/notification-channels'))
		.data;
