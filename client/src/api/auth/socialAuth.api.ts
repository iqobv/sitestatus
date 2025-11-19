import { fetcher } from '@/utils';

export const googleAuth = async () =>
	await fetcher('/api/v1/oauth/google', {
		method: 'GET',
	});
