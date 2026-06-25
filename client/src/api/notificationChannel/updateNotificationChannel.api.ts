import { UpdateNotificationChannelDto } from '@/dto/notificationChannel.dto';
import { NotificationChannel } from '@/types/notificationChannel/notificationChannel.types';
import { apiClient } from '../axios';

export const updateNotificationChannel = async (
	id: string,
	dto: UpdateNotificationChannelDto,
) =>
	(
		await apiClient.patch<NotificationChannel>(
			`/v1/notification-channels/${id}`,
			dto,
		)
	).data;
