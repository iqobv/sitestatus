import { Project } from '@/types/project';
import { apiClient, apiServer } from '../axios';

export const getAllProjects = async () =>
	(await apiClient.get<Project[]>('/v1/projects')).data;

export const getServerAllProjects = async () =>
	(await apiServer.get<Project[]>(`/v1/projects`)).data;
