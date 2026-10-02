import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetAllProjectsWithMonitorsResponse =
	paths['/v1/projects/with-monitors']['get']['responses']['200']['content']['application/json'];

export const getAllProjectsWithMonitors = async () =>
	(
		await apiClient.get<GetAllProjectsWithMonitorsResponse>(
			'/v1/projects/with-monitors',
		)
	).data;
