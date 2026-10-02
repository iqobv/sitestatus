import { getAllProjectsWithMonitors } from '@/api/project/getAllProjectsWithMonitors.api';
import { getProjectById } from '@/api/project/getProjectById.api';

export type Project = Awaited<ReturnType<typeof getProjectById>>;

export type ProjectWithMonitors = Awaited<
	ReturnType<typeof getAllProjectsWithMonitors>
>[number];
