import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type SendGenerateRestoreTokenEmailResponse =
	paths['/v1/auth/generate-restore-token']['post']['responses']['200']['content']['application/json'];
type RestoreAccountResponse =
	paths['/v1/auth/restore-account']['post']['responses']['200']['content']['application/json'];

export const sendGenerateRestoreTokenEmail = async (email: string) =>
	(
		await apiClient.post<SendGenerateRestoreTokenEmailResponse>(
			'/v1/auth/generate-restore-token',
			{ email },
		)
	).data;

export const restoreAccount = async (token: string) =>
	(
		await apiClient.post<RestoreAccountResponse>(
			`/v1/auth/restore-account?token=${token}`,
		)
	).data;
