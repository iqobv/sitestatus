import { Project } from '@/types/project';
import { apiClient, apiServer } from '../axios';

export const getProjectById = async (projectId: string) =>
	(await apiClient.get<Project>(`/v1/projects/id/${projectId}`)).data;

export const getServerProjectById = async (projectId: string) =>
	(await apiServer.get<Project>(`/v1/projects/id/${projectId}`)).data;
