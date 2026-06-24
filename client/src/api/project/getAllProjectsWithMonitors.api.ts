import { ProjectWithMonitors } from '@/types/project/project.types';
import { apiClient } from '../axios';

export const getAllProjectsWithMonitors = async () =>
	(await apiClient.get<ProjectWithMonitors[]>('/v1/projects/with-monitors'))
		.data;
