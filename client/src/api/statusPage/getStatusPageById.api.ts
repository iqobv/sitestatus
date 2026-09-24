import { FullStatusPage } from '@/types/statusPage/statusPage.types';
import { apiClient } from '../axios';

export const getStatusPageById = async (id: string) =>
	(await apiClient.get<FullStatusPage>(`/v1/status-pages/id/${id}`)).data;
