import { PublicProjectPage } from '@/types';
import { apiClient, apiServer } from '../axios';

export const getProjectBySlug = async (slug: string) =>
	(await apiClient.get<PublicProjectPage>(`/v1/projects/slug/${slug}`)).data;

export const getServerProjectBySlug = async (slug: string) =>
	(await apiServer.get<PublicProjectPage>(`/v1/projects/slug/${slug}`)).data;
