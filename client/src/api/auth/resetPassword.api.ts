import { ResetPasswordDto } from '@/dto';
import { ApiMessageResponse } from '@/types';
import { apiClient } from '../axios';

export const resetPassword = async (token: string, dto: ResetPasswordDto) =>
	(
		await apiClient.post<ApiMessageResponse>('/v1/auth/reset-password', {
			...dto,
			token,
		})
	).data;
