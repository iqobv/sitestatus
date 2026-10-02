import { CreateProjectDto } from '@/dto/project.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type CreateProjectResponse =
	paths['/v1/projects']['post']['responses']['200']['content']['application/json'];

export const createProject = async (dto: CreateProjectDto) =>
	(await apiClient.post<CreateProjectResponse>('/v1/projects', dto)).data;
