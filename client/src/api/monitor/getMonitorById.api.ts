import { MonitorFull, MonitorWithRegions } from '@/types';
import { apiClient, apiServer } from '../axios';

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
