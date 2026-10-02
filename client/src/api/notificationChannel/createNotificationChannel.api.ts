import { CreateNotificationChannelDto } from '@/dto/notificationChannel.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type CreateNotificationChannelResponse =
	paths['/v1/notification-channels']['post']['responses']['201']['content']['application/json'];

export const createNotificationChannel = async (
	dto: CreateNotificationChannelDto,
) =>
	(
		await apiClient.post<CreateNotificationChannelResponse>(
			`/v1/notification-channels`,
			dto,
		)
	).data;
