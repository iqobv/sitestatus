import { CreateMonitorDto, UpdateMonitorDto } from '@/dto';
import { Monitor, MonitorMainInfo, MonitorWithMonitorStats } from '@/types';
import { apiClient, apiServer } from '../axios';

export const createMonitor = async (dto: CreateMonitorDto) =>
	(await apiClient.post<Monitor>(`/v1/monitors/create`, dto)).data;

export const getMonitors = async () =>
	(await apiClient.get<MonitorWithMonitorStats[]>(`/v1/monitors/me`)).data;

export const getServerMonitors = async () =>
	(await apiServer.get<MonitorWithMonitorStats[]>(`/v1/monitors/me`)).data;

export const getMonitorById = async (monitorId: string) =>
	(await apiClient.get<MonitorMainInfo>(`/v1/monitors/id/${monitorId}`)).data;

export const getServerMonitorById = async (monitorId: string) =>
	(await apiServer.get<Monitor>(`/v1/monitors/id/${monitorId}`)).data;

export const updateMonitor = async (monitorId: string, dto: UpdateMonitorDto) =>
	(await apiClient.patch<Monitor>(`/v1/monitors/${monitorId}`, dto)).data;
