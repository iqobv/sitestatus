import { ApiMessageResponse } from '@/types';
import { apiServer } from '../axios';

export const verifyNotificationChannel = async (token: string) =>
	(
		await apiServer.post<ApiMessageResponse>(
			`/v1/notification-channels/verify?token=${token}`,
		)
	).data;
