import { CreateNotificationChannelDto } from '@/dto';
import { ApiMessageResponse } from '@/types';
import { apiClient } from '../axios';

export const createNotificationChannel = async (
	dto: CreateNotificationChannelDto,
) =>
	(await apiClient.post<ApiMessageResponse>(`/v1/notification-channels`, dto))
		.data;
