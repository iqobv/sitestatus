import { Dashboard } from '@/types/dashboard/dashboard.types';
import { apiClient } from '../axios';

export const getDashboard = async () =>
	(await apiClient.get<Dashboard>('/v1/dashboard')).data;
