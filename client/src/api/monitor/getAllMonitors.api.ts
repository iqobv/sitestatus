import { MonitorsQueryDto } from '@/dto/monitor.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetAllMonitorsResponse =
	paths['/v1/monitors']['get']['responses']['200']['content']['application/json'];
type GetAllMonitorsByProjectIdResponse =
	paths['/v1/monitors/projects/{projectId}']['get']['responses']['200']['content']['application/json'];

export const getAllMonitors = async (params: MonitorsQueryDto) =>
	(await apiClient.get<GetAllMonitorsResponse>(`/v1/monitors`, { params }))
		.data;

export const getAllMonitorsByProjectId = async (
	projectId: string,
	params: MonitorsQueryDto,
) =>
	(
		await apiClient.get<GetAllMonitorsByProjectIdResponse>(
			`/v1/monitors/projects/${projectId}`,
			{
				params,
			},
		)
	).data;
