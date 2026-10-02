import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type DeleteProjectResponse =
	paths['/v1/projects/{id}']['delete']['responses']['200']['content']['application/json'];

export const deleteProject = async (id: string) =>
	(await apiClient.delete<DeleteProjectResponse>(`/v1/projects/${id}`)).data;
