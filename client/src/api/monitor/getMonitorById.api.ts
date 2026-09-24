import {
	MonitorWithRegions,
	MonitorWithRegionsIds,
} from '@/types/monitors/monitor.types';
import { apiClient } from '../axios';

export const getMonitorById = async (monitorId: string) =>
	(await apiClient.get<MonitorWithRegionsIds>(`/v1/monitors/id/${monitorId}`))
		.data;

export const getMonitorByIdFull = async (monitorId: string) =>
	(await apiClient.get<MonitorWithRegions>(`/v1/monitors/id/${monitorId}/full`))
		.data;
