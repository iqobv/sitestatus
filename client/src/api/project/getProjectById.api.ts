import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetProjectByIdResponse =
	paths['/v1/projects/id/{id}']['get']['responses']['200']['content']['application/json'];

export const getProjectById = async (projectId: string) =>
	(await apiClient.get<GetProjectByIdResponse>(`/v1/projects/id/${projectId}`))
		.data;
