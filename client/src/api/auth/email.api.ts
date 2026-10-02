import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type VerifyEmailResponse =
	paths['/v1/auth/verify-email']['get']['responses']['200']['content']['application/json'];
type ResendVerificationEmailResponse =
	paths['/v1/auth/resend-verification-email']['post']['responses']['200']['content']['application/json'];

export const verifyEmail = async (token: string) =>
	(
		await apiClient.get<VerifyEmailResponse>(
			`/v1/auth/verify-email?token=${token}`,
		)
	).data;

export const resendVerificationEmail = async (email: string) =>
	(
		await apiClient.post<ResendVerificationEmailResponse>(
			`/v1/auth/resend-verification-email`,
			{ email },
		)
	).data;
