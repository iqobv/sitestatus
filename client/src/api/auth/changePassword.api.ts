import { ChangePasswordDto } from '@/dto/auth.dto';
import { ApiMessageResponse } from '@/types/api/messageResponse.api';
import { apiClient } from '../axios';

export const changePassword = async (dto: ChangePasswordDto) =>
	(await apiClient.post<ApiMessageResponse>('/v1/auth/change-password', dto))
		.data;
