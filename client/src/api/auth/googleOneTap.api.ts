import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GoogleOneTapLoginResponse =
	paths['/v1/oauth/google/one-tap']['post']['responses']['200']['content']['application/json'];

export const googleOneTapLogin = async (credential: string) =>
	(
		await apiClient.post<GoogleOneTapLoginResponse>(
			'/v1/oauth/google/one-tap',
			{ credential },
		)
	).data;
