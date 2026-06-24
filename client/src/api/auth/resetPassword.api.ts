import { ResetPasswordDto } from '@/dto/auth.dto';
import { ApiMessageResponse } from '@/types/api/messageResponse.api';
import { apiClient } from '../axios';

export const resetPassword = async (token: string, dto: ResetPasswordDto) =>
	(
		await apiClient.post<ApiMessageResponse>('/v1/auth/reset-password', {
			...dto,
			token,
		})
	).data;
