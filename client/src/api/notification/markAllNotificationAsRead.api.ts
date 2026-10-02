import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type MarkAllNotificationAsReadResponse =
	paths['/v1/notifications/mark-all-as-read']['post']['responses']['200']['content']['application/json'];

export const markAllNotificationAsRead = async () =>
	(
		await apiClient.post<MarkAllNotificationAsReadResponse>(
			'/v1/notifications/mark-all-as-read',
		)
	).data;
