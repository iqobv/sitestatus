import { StatusPagesQueryDto } from '@/dto';
import { StatusPage } from '@/types';
import { PaginatedData } from '@/types/api/paginatedData.types';
import { apiClient, apiServer } from '../axios';

type GetUserStatusPagesResponse = PaginatedData<StatusPage>;

export const getUserStatusPages = async (params: StatusPagesQueryDto) =>
	(
		await apiClient.get<GetUserStatusPagesResponse>(`/v1/status-pages/me`, {
			params,
		})
	).data;

export const getServerUserStatusPages = async (params: StatusPagesQueryDto) =>
	(
		await apiServer.get<GetUserStatusPagesResponse>(`/v1/status-pages/me`, {
			params,
		})
	).data;
