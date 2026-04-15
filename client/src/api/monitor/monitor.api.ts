import { CreateMonitorDto, UpdateMonitorDto } from '@/dto';
import {
	ApiMessageResponse,
	Monitor,
	MonitorFull,
	MonitorWithMonitorStats,
	MonitorWithRegions,
} from '@/types';
import { apiClient, apiServer } from '../axios';

export const createMonitor = async (dto: CreateMonitorDto) =>
	(await apiClient.post<Monitor>(`/v1/monitors/create`, dto)).data;

export const getMonitors = async () =>
	(await apiClient.get<MonitorWithMonitorStats[]>(`/v1/monitors/me`)).data;

export const getServerMonitors = async () =>
	(await apiServer.get<MonitorWithMonitorStats[]>(`/v1/monitors/me`)).data;

export const getMonitorById = async (monitorId: string) =>
	(await apiClient.get<MonitorWithRegions>(`/v1/monitors/id/${monitorId}`))
		.data;

export const getServerMonitorById = async (monitorId: string) =>
	(await apiServer.get<MonitorWithRegions>(`/v1/monitors/id/${monitorId}`))
		.data;

export const getMonitorByIdFull = async (monitorId: string) =>
	(await apiClient.get<MonitorFull>(`/v1/monitors/id/${monitorId}/full`)).data;

export const getServerMonitorByIdFull = async (monitorId: string) =>
	(await apiServer.get<MonitorFull>(`/v1/monitors/id/${monitorId}/full`)).data;

export const updateMonitor = async (monitorId: string, dto: UpdateMonitorDto) =>
	(await apiClient.patch<MonitorWithRegions>(`/v1/monitors/${monitorId}`, dto))
		.data;

export const updateMonitorActiveStatus = async (monitorId: string) =>
	(await apiClient.patch<Monitor>(`/v1/monitors/${monitorId}/active-status`))
		.data;

export const deleteMonitor = async (monitorId: string) =>
	(await apiClient.delete<ApiMessageResponse>(`/v1/monitors/${monitorId}`))
		.data;
