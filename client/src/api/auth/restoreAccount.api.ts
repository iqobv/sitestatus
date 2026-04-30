import { ApiMessageResponse } from '@/types';
import { apiClient } from '../axios';

export const sendGenerateRestoreTokenEmail = async (email: string) =>
	(
		await apiClient.post<ApiMessageResponse>(
			'/v1/auth/generate-restore-token',
			{ email },
		)
	).data;

export const restoreAccount = async (token: string) =>
	(
		await apiClient.post<ApiMessageResponse>(
			`/v1/auth/restore-account?token=${token}`,
		)
	).data;
