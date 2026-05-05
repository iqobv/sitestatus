import z from 'zod';

export const upsertAlertSettingsSchema = z
	.object({
		projectId: z.uuidv4().optional(),
		monitorId: z.uuidv4().optional(),
		isEnabled: z.boolean().optional().default(true),
		onDown: z.boolean().optional().default(true),
		onUp: z.boolean().optional().default(true),
		delay: z.coerce
			.number({ error: 'Delay must be a number' })
			.min(0, { message: 'Delay must be at least 0' })
			.optional()
			.default(0),
		channelIds: z.array(z.uuidv4()).optional().default([]),
	})
	.superRefine((data, ctx) => {
		const hasProjectId = !!data.projectId;
		const hasMonitorId = !!data.monitorId;

		if (hasProjectId && hasMonitorId) {
			const message = 'Only one of projectId or monitorId must be provided';
			ctx.addIssue({
				code: 'custom',
				message,
				path: ['projectId'],
			});
			ctx.addIssue({
				code: 'custom',
				message,
				path: ['monitorId'],
			});
		}
	});
