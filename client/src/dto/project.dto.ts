import {
	baseProjectSchema,
	createProjectSchema,
	updateProjectSchema,
} from '@/schemas';
import { projectsQuerySchema } from '@/schemas/project/projectsQuery.schema';
import z from 'zod';

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;
export type BaseProjectDto = z.infer<typeof baseProjectSchema>;
export type ProjectsQueryDto = z.infer<typeof projectsQuerySchema>;
