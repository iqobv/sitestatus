import { createProjectSchema, updateProjectSchema } from '@/schemas';
import z from 'zod';

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
export type UpdateProjectDto = z.infer<typeof updateProjectSchema>;
