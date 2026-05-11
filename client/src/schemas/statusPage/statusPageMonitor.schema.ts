import z from 'zod';

export const statusPageMonitorSchema = z.object({
	id: z.uuidv4({ error: 'Invalid monitor ID' }),
	displayName: z.preprocess(
		(val) => (val === '' ? null : val),
		z
			.string({ error: 'Invalid display name' })
			.min(3, { error: 'Display name must be at least 3 characters' })
			.max(100, { error: 'Display name must be at most 100 characters' })
			.nullable(),
	),
	sortOrder: z
		.number({ error: 'Invalid sort order' })
		.min(0, { error: 'Sort order must be a positive integer' }),
});
