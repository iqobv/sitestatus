import { PaginationQueryDto } from '@/dto/ui.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetAllNotificationsResponse =
	paths['/v1/notifications']['get']['responses']['200']['content']['application/json'];

export const getAllNotifications = async (params: PaginationQueryDto) =>
	(
		await apiClient.get<GetAllNotificationsResponse>('/v1/notifications', {
			params,
		})
	).data;
