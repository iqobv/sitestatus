import { StatusPagesQueryDto } from '@/dto/statusPage.dto';
import { PaginatedData } from '@/types/api/paginatedData.types';
import { StatusPage } from '@/types/statusPage/statusPage.types';
import { apiClient } from '../axios';

type GetUserStatusPagesResponse = PaginatedData<StatusPage>;

export const getUserStatusPages = async (params: StatusPagesQueryDto) =>
	(
		await apiClient.get<GetUserStatusPagesResponse>(`/v1/status-pages/me`, {
			params,
		})
	).data;
