import { CreateMonitorDto } from '@/dto/monitor.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type CreateMonitorResponse =
	paths['/v1/monitors/create']['post']['responses']['201']['content']['application/json'];

export const createMonitor = async (dto: CreateMonitorDto) =>
	(await apiClient.post<CreateMonitorResponse>(`/v1/monitors/create`, dto))
		.data;
