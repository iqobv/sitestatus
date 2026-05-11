import z from 'zod';

export const baseStatusPageSchema = z.object({
	slug: z
		.string({ error: 'Invalid slug' })
		.slugify()
		.min(3, { error: 'Slug must be at least 3 characters' })
		.max(50, { error: 'Slug must be at most 50 characters' }),
	title: z
		.string({ error: 'Invalid title' })
		.min(3, { error: 'Title must be at least 3 characters' })
		.max(50, { error: 'Title must be at most 50 characters' }),
	description: z
		.string({ error: 'Invalid description' })
		.max(250, { error: 'Description must be at most 250 characters' })
		.nullable(),
});
