import { ApiMessageResponse } from '@/types';
import { apiClient } from '../axios';

export const deleteProject = async (id: string) =>
	(await apiClient.delete<ApiMessageResponse>(`/v1/projects/${id}`)).data;
