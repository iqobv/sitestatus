import { ILoginResponse } from '@/types';
import { fetcher } from '@/utils';

export const verifyEmail = async (userId: string, token: string) =>
	await fetcher<{ message: string } & ILoginResponse>(
		`/api/v1/auth/verify-email?userId=${userId}&token=${token}`
	);

export const resendVerificationEmail = async (email: string) =>
	await fetcher<{ message: string }>('/api/v1/auth/resend-verification-email', {
		method: 'POST',
		body: JSON.stringify({ email }),
	});
