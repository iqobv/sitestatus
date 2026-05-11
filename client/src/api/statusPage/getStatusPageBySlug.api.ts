import { PublicStatusPage } from '@/types';
import { apiClient, apiServer } from '../axios';

export const getStatusPageBySlug = async (slug: string) =>
	(await apiClient.get<PublicStatusPage>(`/v1/status-pages/slug/${slug}`)).data;

export const getServerStatusPageBySlug = async (slug: string) =>
	(await apiServer.get<PublicStatusPage>(`/v1/status-pages/slug/${slug}`)).data;
