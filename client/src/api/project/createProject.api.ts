import { CreateProjectDto } from '@/dto/project.dto';
import { Project } from '@/types/project/project.types';
import { apiClient } from '../axios';

export const createProject = async (dto: CreateProjectDto) =>
	(await apiClient.post<Project>('/v1/projects', dto)).data;
