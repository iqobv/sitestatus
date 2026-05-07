import { ApiMessageResponse } from '@/types';
import { apiClient } from '../axios';

export const deleteStatusPage = async (id: string) =>
	(await apiClient.delete<ApiMessageResponse>(`/v1/status-pages/${id}`)).data;
