import z from 'zod';

export const baseNotificationChannelSchema = z.object({
	name: z
		.string({ error: 'Name is required' })
		.max(100, { error: 'Name is too long' }),
});
