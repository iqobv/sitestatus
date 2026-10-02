import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetAllSessionsResponse =
	paths['/v1/sessions']['get']['responses']['200']['content']['application/json'];

export const getAllSessions = async () =>
	(await apiClient.get<GetAllSessionsResponse>('/v1/sessions')).data;
