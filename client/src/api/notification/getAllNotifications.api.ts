import { UserNotifications } from '@/types/notification/userNotifications.types';
import { apiClient } from '../axios';

export const getAllNotifications = async () =>
	(await apiClient.get<UserNotifications>('/v1/notifications')).data;
