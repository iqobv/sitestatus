import { StatusPage } from '@/types';
import { apiClient, apiServer } from '../axios';

export const getUserStatusPages = async () =>
	(await apiClient.get<StatusPage[]>(`/v1/status-pages/me`)).data;

export const getServerUserStatusPages = async () =>
	(await apiServer.get<StatusPage[]>(`/v1/status-pages/me`)).data;
