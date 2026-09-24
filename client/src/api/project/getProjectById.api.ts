import { Project } from '@/types/project/project.types';
import { apiClient } from '../axios';

export const getProjectById = async (projectId: string) =>
	(await apiClient.get<Project>(`/v1/projects/id/${projectId}`)).data;
