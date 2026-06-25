import { ApiMessageResponse } from '@/types/api/messageResponse.api';
import { apiClient } from '../axios';

export const deleteStatusPage = async (id: string) =>
	(await apiClient.delete<ApiMessageResponse>(`/v1/status-pages/${id}`)).data;
