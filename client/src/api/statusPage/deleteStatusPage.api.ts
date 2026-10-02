import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type DeleteStatusPageResponse =
	paths['/v1/status-pages/{id}']['delete']['responses']['200']['content']['application/json'];

export const deleteStatusPage = async (id: string) =>
	(await apiClient.delete<DeleteStatusPageResponse>(`/v1/status-pages/${id}`))
		.data;
