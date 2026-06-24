import { MonitorsQueryDto } from '@/dto/monitor.dto';
import { PaginatedMonitors } from '@/types/monitors/monitor.types';
import { apiClient, apiServer } from '../axios';

export const getAllMonitors = async (params: MonitorsQueryDto) =>
	(await apiClient.get<PaginatedMonitors>(`/v1/monitors`, { params })).data;

export const getServerAllMonitors = async (params: MonitorsQueryDto) =>
	(await apiServer.get<PaginatedMonitors>(`/v1/monitors`, { params })).data;

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

export const getServerAllMonitorsByProjectId = async (
	projectId: string,
	params: MonitorsQueryDto,
) =>
	(
		await apiServer.get<PaginatedMonitors>(
			`/v1/monitors/projects/${projectId}`,
			{
				params,
			},
		)
	).data;
