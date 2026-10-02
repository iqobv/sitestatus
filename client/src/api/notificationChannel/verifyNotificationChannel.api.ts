import { paths } from '@/types/schema';
import { apiServer } from '../axios';

type VerifyNotificationChannelResponse =
	paths['/v1/notification-channels/verify']['post']['responses']['200']['content']['application/json'];

export const verifyNotificationChannel = async (token: string) =>
	(
		await apiServer.post<VerifyNotificationChannelResponse>(
			`/v1/notification-channels/verify?token=${token}`,
		)
	).data;
