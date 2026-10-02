import { ChangePasswordDto } from '@/dto/auth.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type ChangePasswordResponse =
	paths['/v1/auth/change-password']['post']['responses']['200']['content']['application/json'];

export const changePassword = async (dto: ChangePasswordDto) =>
	(
		await apiClient.post<ChangePasswordResponse>(
			'/v1/auth/change-password',
			dto,
		)
	).data;
