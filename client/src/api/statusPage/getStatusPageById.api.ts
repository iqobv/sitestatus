import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetStatusPageByIdResponse =
	paths['/v1/status-pages/id/{id}']['get']['responses']['200']['content']['application/json'];

export const getStatusPageById = async (id: string) =>
	(await apiClient.get<GetStatusPageByIdResponse>(`/v1/status-pages/id/${id}`))
		.data;
