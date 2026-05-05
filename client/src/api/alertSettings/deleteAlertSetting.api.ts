import { ApiMessageResponse } from '@/types';
import { apiClient } from '../axios';

export const deleteAlertSetting = async (id: string) =>
	(await apiClient.delete<ApiMessageResponse>(`/v1/alert-settings/${id}`)).data;
