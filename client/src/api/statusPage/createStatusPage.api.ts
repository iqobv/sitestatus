import { CreateStatusPageDto } from '@/dto';
import { FullStatusPage } from '@/types';
import { apiClient } from '../axios';

export const createStatusPage = async (dto: CreateStatusPageDto) =>
	(await apiClient.post<FullStatusPage>('/v1/status-pages', dto)).data;
