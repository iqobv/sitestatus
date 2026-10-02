import { CreateStatusPageDto } from '@/dto/statusPage.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type CreateStatusPageResponse =
	paths['/v1/status-pages']['post']['responses']['200']['content']['application/json'];

export const createStatusPage = async (dto: CreateStatusPageDto) =>
	(await apiClient.post<CreateStatusPageResponse>('/v1/status-pages', dto))
		.data;
