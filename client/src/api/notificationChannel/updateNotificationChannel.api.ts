import { UpdateNotificationChannelDto } from '@/dto/notificationChannel.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type UpdateNotificationChannelResponse =
	paths['/v1/notification-channels/{id}']['patch']['responses']['200']['content']['application/json'];

export const updateNotificationChannel = async (
	id: string,
	dto: UpdateNotificationChannelDto,
) =>
	(
		await apiClient.patch<UpdateNotificationChannelResponse>(
			`/v1/notification-channels/${id}`,
			dto,
		)
	).data;
