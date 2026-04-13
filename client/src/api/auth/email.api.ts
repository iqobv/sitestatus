import { ApiMessageResponse, LoginResponse } from '@/types';
import { apiClient } from '../axios';

export const verifyEmail = async (userId: string, token: string) =>
	(
		await apiClient.get<{ message: string } & LoginResponse>(
			`/v1/auth/verify-email?userId=${userId}&token=${token}`,
		)
	).data;

export const resendVerificationEmail = async (email: string) =>
	(
		await apiClient.post<ApiMessageResponse>(
			`/v1/auth/resend-verification-email`,
			email,
		)
	).data;
