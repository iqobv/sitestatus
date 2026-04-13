import { apiClient } from '../axios';

export const googleAuth = async () =>
	(await apiClient.get(`/v1/oauth/google`)).data;
