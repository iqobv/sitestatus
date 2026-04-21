import { CreateProjectDto } from '@/dto';
import { Project } from '@/types/project';
import { apiClient } from '../axios';

export const createProject = async (dto: CreateProjectDto) =>
	(await apiClient.post<Project>('/v1/projects', dto)).data;
