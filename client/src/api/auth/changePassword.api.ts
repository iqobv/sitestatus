import { ChangePasswordDto } from '@/dto';
import { ApiMessageResponse } from '@/types';
import { apiClient } from '../axios';

export const changePassword = async (dto: ChangePasswordDto) =>
	(await apiClient.post<ApiMessageResponse>('/v1/auth/change-password', dto))
		.data;
