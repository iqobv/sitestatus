import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type DeleteAccountResponse =
	paths['/v1/users']['delete']['responses']['200']['content']['application/json'];

export const deleteAccount = async () =>
	await apiClient.delete<DeleteAccountResponse>('/v1/users');
