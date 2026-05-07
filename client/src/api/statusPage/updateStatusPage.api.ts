import { CreateStatusPageDto } from '@/dto';
import { FullStatusPage } from '@/types';
import { apiClient } from '../axios';

export const updateStatusPage = async (id: string, dto: CreateStatusPageDto) =>
	(await apiClient.patch<FullStatusPage>(`/v1/status-pages/${id}`, dto)).data;
