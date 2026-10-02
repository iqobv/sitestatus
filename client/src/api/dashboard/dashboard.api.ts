import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetDashboardResponse =
	paths['/v1/dashboard']['get']['responses']['200']['content']['application/json'];

export const getDashboard = async () =>
	(await apiClient.get<GetDashboardResponse>('/v1/dashboard')).data;
