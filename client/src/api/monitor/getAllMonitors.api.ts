import { MonitorWithMonitorStats } from '@/types';
import { apiClient, apiServer } from '../axios';

export const getAllMonitors = async () =>
	(await apiClient.get<MonitorWithMonitorStats[]>(`/v1/monitors`)).data;

export const getServerAllMonitors = async () =>
	(await apiServer.get<MonitorWithMonitorStats[]>(`/v1/monitors`)).data;

export const getAllMonitorsByProjectId = async (projectId: string) =>
	(
		await apiClient.get<MonitorWithMonitorStats[]>(
			`/v1/monitors/projects/${projectId}`,
		)
	).data;

export const getServerAllMonitorsByProjectId = async (projectId: string) =>
	(
		await apiServer.get<MonitorWithMonitorStats[]>(
			`/v1/monitors/projects/${projectId}`,
		)
	).data;
