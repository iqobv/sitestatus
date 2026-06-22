import { Dashboard } from '@/types/dashboard/dashboard.types';
import { apiClient, apiServer } from '../axios';

export const getDashboard = async () =>
	(await apiClient.get<Dashboard>('/v1/dashboard')).data;

export const getServerDashboard = async () =>
	(await apiServer.get<Dashboard>('/v1/dashboard')).data;
