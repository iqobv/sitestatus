import { ProjectsQueryDto } from '@/dto/project.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetAllProjectsResponse =
	paths['/v1/projects']['get']['responses']['200']['content']['application/json'];

export const getAllProjects = async (params: ProjectsQueryDto) =>
	(await apiClient.get<GetAllProjectsResponse>('/v1/projects', { params }))
		.data;
