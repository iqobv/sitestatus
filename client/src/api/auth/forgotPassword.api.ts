import { EmailDto } from '@/dto/auth.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type ForgotPasswordResponse =
	paths['/v1/auth/forgot-password']['post']['responses']['200']['content']['application/json'];

export const forgotPassword = async (dto: EmailDto) =>
	(
		await apiClient.post<ForgotPasswordResponse>(
			'/v1/auth/forgot-password',
			dto,
		)
	).data;
