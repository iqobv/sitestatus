import { UpdateMonitorDto } from '@/dto/monitor.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type UpdateMonitorResponse =
	paths['/v1/monitors/{id}']['patch']['responses']['200']['content']['application/json'];
type UpdateMonitorActiveStatusResponse =
	paths['/v1/monitors/{id}/active-status']['patch']['responses']['200']['content']['application/json'];

export const updateMonitor = async (monitorId: string, dto: UpdateMonitorDto) =>
	(
		await apiClient.patch<UpdateMonitorResponse>(
			`/v1/monitors/${monitorId}`,
			dto,
		)
	).data;

export const updateMonitorActiveStatus = async (monitorId: string) =>
	(
		await apiClient.patch<UpdateMonitorActiveStatusResponse>(
			`/v1/monitors/${monitorId}/active-status`,
		)
	).data;
