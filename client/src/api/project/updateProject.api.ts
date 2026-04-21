import { UpdateProjectDto } from '@/dto';
import { Project } from '@/types/project';
import { apiClient } from '../axios';

export const updateProject = async (id: string, dto: UpdateProjectDto) =>
	(await apiClient.patch<Project>(`/v1/projects/${id}`, dto)).data;
