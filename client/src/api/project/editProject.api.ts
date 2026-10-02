import { UpdateProjectDto } from '@/dto/project.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type EditProjectResponse =
	paths['/v1/projects/{id}']['patch']['responses']['200']['content']['application/json'];

export const editProject = async (id: string, dto: UpdateProjectDto) =>
	(await apiClient.patch<EditProjectResponse>(`/v1/projects/${id}`, dto)).data;
