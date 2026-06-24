import { ApiMessageResponse } from '@/types/api/messageResponse.api';
import { apiClient } from '../axios';

export const deleteAlertSetting = async (id: string) =>
	(await apiClient.delete<ApiMessageResponse>(`/v1/alert-settings/${id}`)).data;
