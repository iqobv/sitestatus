import { CreateStatusPageDto } from '@/dto/statusPage.dto';
import { FullStatusPage } from '@/types/statusPage/statusPage.types';
import { apiClient } from '../axios';

export const createStatusPage = async (dto: CreateStatusPageDto) =>
	(await apiClient.post<FullStatusPage>('/v1/status-pages', dto)).data;
