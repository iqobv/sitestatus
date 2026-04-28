import { apiClient } from '../axios';

export const googleOneTapLogin = async (credential: string) =>
	(await apiClient.post('/v1/oauth/google/one-tap', { credential })).data;
