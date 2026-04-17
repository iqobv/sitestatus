import { UpdateMonitorDto } from '@/dto';
import { Monitor, MonitorWithRegions } from '@/types';
import { apiClient } from '../axios';

export const updateMonitor = async (monitorId: string, dto: UpdateMonitorDto) =>
	(await apiClient.patch<MonitorWithRegions>(`/v1/monitors/${monitorId}`, dto))
		.data;

export const updateMonitorActiveStatus = async (monitorId: string) =>
	(await apiClient.patch<Monitor>(`/v1/monitors/${monitorId}/active-status`))
		.data;
