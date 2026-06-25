import { CreateNotificationChannelDto } from '@/dto/notificationChannel.dto';
import { ApiMessageResponse } from '@/types/api/messageResponse.api';
import { apiClient } from '../axios';

export const createNotificationChannel = async (
	dto: CreateNotificationChannelDto,
) =>
	(await apiClient.post<ApiMessageResponse>(`/v1/notification-channels`, dto))
		.data;
