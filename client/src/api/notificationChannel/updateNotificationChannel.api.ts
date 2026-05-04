import { UpdateNotificationChannelDto } from '@/dto';
import { NotificationChannel } from '@/types';
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
