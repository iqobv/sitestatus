import { EmailDto } from '@/dto';
import { ApiMessageResponse } from '@/types';
import { apiClient } from '../axios';

export const forgotPassword = async (dto: EmailDto) =>
	(await apiClient.post<ApiMessageResponse>('/v1/auth/forgot-password', dto))
		.data;
