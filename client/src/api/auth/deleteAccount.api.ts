import { ApiMessageResponse } from '@/types';
import { apiClient } from '../axios';

export const deleteAccount = async () =>
	await apiClient.delete<ApiMessageResponse>('/v1/users');
