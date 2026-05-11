import { UserNotifications } from '@/types';
import { apiClient } from '../axios';

export const getAllNotifications = async () =>
	(await apiClient.get<UserNotifications>('/v1/notifications')).data;
