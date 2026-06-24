import { UpdateMonitorDto } from '@/dto/monitor.dto';
import {
	BaseMonitor,
	MonitorWithRegionsIds,
} from '@/types/monitors/monitor.types';
import { apiClient } from '../axios';

export const updateMonitor = async (monitorId: string, dto: UpdateMonitorDto) =>
	(
		await apiClient.patch<MonitorWithRegionsIds>(
			`/v1/monitors/${monitorId}`,
			dto,
		)
	).data;

export const updateMonitorActiveStatus = async (monitorId: string) =>
	(
		await apiClient.patch<BaseMonitor>(
			`/v1/monitors/${monitorId}/active-status`,
		)
	).data;
