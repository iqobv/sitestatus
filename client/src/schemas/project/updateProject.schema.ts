import z from 'zod';
import { baseProjectSchema } from './baseProject.schema';

export const updateProjectSchema = baseProjectSchema
	.extend({
		isPublic: z.boolean().optional(),
	})
	.partial();
