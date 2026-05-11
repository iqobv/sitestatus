import { FullStatusPage } from '@/types';
import { apiClient, apiServer } from '../axios';

export const getStatusPageById = async (id: string) =>
	(await apiClient.get<FullStatusPage>(`/v1/status-pages/id/${id}`)).data;

export const getServerStatusPageById = async (id: string) =>
	(await apiServer.get<FullStatusPage>(`/v1/status-pages/id/${id}`)).data;
