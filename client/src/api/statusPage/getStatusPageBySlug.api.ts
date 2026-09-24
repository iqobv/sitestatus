import { PublicStatusPage } from '@/types/statusPage/publicStatusPage.types';
import { apiClient } from '../axios';

export const getStatusPageBySlug = async (slug: string) =>
	(await apiClient.get<PublicStatusPage>(`/v1/status-pages/slug/${slug}`)).data;
