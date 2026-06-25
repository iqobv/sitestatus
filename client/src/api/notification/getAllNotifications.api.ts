import { PaginationQueryDto } from '@/dto/ui.dto';
import { UserNotifications } from '@/types/notification/userNotifications.types';
import { apiClient } from '../axios';

export const getAllNotifications = async (params: PaginationQueryDto) =>
	(await apiClient.get<UserNotifications>('/v1/notifications', { params }))
		.data;
