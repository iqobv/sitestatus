import { ApiMessageResponse } from '@/types/api/messageResponse.api';
import { apiClient } from '../axios';

export const deleteProject = async (id: string) =>
	(await apiClient.delete<ApiMessageResponse>(`/v1/projects/${id}`)).data;
