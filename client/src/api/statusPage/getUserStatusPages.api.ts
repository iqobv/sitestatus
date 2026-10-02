import { StatusPagesQueryDto } from '@/dto/statusPage.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetUserStatusPagesResponse =
	paths['/v1/status-pages/me']['get']['responses']['200']['content']['application/json'];

export const getUserStatusPages = async (params: StatusPagesQueryDto) =>
	(
		await apiClient.get<GetUserStatusPagesResponse>(`/v1/status-pages/me`, {
			params,
		})
	).data;
