import { fetcher } from '@/utils';

export const verifyEmail = async (userId: string, token: string) =>
	await fetcher<{ message: string }>(
		`/api/v1/auth/verify-email?userId=${userId}&token=${token}`
	);
