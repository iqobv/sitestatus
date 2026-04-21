import { ApiMessageResponse, LoginResponse } from '@/types';
import { apiClient } from '../axios';

export const verifyEmail = async (token: string) =>
	(
		await apiClient.get<ApiMessageResponse & LoginResponse>(
			`/v1/auth/verify-email?token=${token}`,
		)
	).data;

export const resendVerificationEmail = async (email: string) =>
	(
		await apiClient.post<ApiMessageResponse>(
			`/v1/auth/resend-verification-email`,
			{ email },
		)
	).data;
