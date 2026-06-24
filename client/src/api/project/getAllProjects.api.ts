import { ProjectsQueryDto } from '@/dto';
import { PaginatedData } from '@/types/api/paginatedData.types';
import { Project } from '@/types/project';
import { apiClient, apiServer } from '../axios';

type GetAllProjectsResponse = PaginatedData<Project>;

export const getAllProjects = async (params: ProjectsQueryDto) =>
	(await apiClient.get<GetAllProjectsResponse>('/v1/projects', { params }))
		.data;

export const getServerAllProjects = async (params: ProjectsQueryDto) =>
	(await apiServer.get<GetAllProjectsResponse>(`/v1/projects`, { params }))
		.data;
