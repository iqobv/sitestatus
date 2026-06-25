import { EmailDto } from '@/dto/auth.dto';
import { ApiMessageResponse } from '@/types/api/messageResponse.api';
import { apiClient } from '../axios';

export const forgotPassword = async (dto: EmailDto) =>
	(await apiClient.post<ApiMessageResponse>('/v1/auth/forgot-password', dto))
		.data;
