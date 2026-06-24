import { ApiMessageResponse } from '@/types/api/messageResponse.api';
import { apiClient } from '../axios';

export const deleteAccount = async () =>
	await apiClient.delete<ApiMessageResponse>('/v1/users');
