import { ResetPasswordDto } from '@/dto/auth.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type ResetPasswordResponse =
	paths['/v1/auth/reset-password']['post']['responses']['200']['content']['application/json'];

export const resetPassword = async (token: string, dto: ResetPasswordDto) =>
	(
		await apiClient.post<ResetPasswordResponse>('/v1/auth/reset-password', {
			...dto,
			token,
		})
	).data;
