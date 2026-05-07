import z from 'zod';
import { createStatusPageSchema } from './createStatusPage.schema';

export const updateStatusPageSchema = createStatusPageSchema.partial().extend({
	isPublished: z.boolean({ error: 'Invalid isPublished value' }).optional(),
});
