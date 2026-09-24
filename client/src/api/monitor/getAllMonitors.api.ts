import { MonitorsQueryDto } from '@/dto/monitor.dto';
import { PaginatedMonitors } from '@/types/monitors/monitor.types';
import { apiClient } from '../axios';

export const getAllMonitors = async (params: MonitorsQueryDto) =>
	(await apiClient.get<PaginatedMonitors>(`/v1/monitors`, { params })).data;

export const getAllMonitorsByProjectId = async (
	projectId: string,
	params: MonitorsQueryDto,
) =>
	(
		await apiClient.get<PaginatedMonitors>(
			`/v1/monitors/projects/${projectId}`,
			{
				params,
			},
		)
	).data;
