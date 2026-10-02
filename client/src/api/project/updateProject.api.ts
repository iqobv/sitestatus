import { UpdateProjectDto } from '@/dto/project.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type UpdateProjectResponse =
	paths['/v1/projects/{id}']['patch']['responses']['200']['content']['application/json'];

export const updateProject = async (id: string, dto: UpdateProjectDto) =>
	(await apiClient.patch<UpdateProjectResponse>(`/v1/projects/${id}`, dto))
		.data;
