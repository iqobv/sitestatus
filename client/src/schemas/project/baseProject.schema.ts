import z from 'zod';

export const baseProjectSchema = z.object({
	name: z.string().min(4).max(100),
	slug: z.string().slugify().min(4),
	description: z.string().min(10).max(300).or(z.literal('')),
});
