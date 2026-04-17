import z from 'zod';

export const baseProjectSchema = z.object({
	name: z.string().min(4).max(100),
	slug: z.string().min(4).max(100),
	description: z.string().max(300).optional(),
});
