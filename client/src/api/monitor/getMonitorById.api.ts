import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetMonitorByIdResponse =
	paths['/v1/monitors/id/{id}']['get']['responses']['200']['content']['application/json'];
type GetMonitorByIdFullResponse =
	paths['/v1/monitors/id/{id}/full']['get']['responses']['200']['content']['application/json'];

export const getMonitorById = async (monitorId: string) =>
	(await apiClient.get<GetMonitorByIdResponse>(`/v1/monitors/id/${monitorId}`))
		.data;

export const getMonitorByIdFull = async (monitorId: string) =>
	(
		await apiClient.get<GetMonitorByIdFullResponse>(
			`/v1/monitors/id/${monitorId}/full`,
		)
	).data;
