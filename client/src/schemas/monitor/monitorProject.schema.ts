import z from 'zod';

export const baseProjectMonitorSchema = z.object({
	projectId: z.preprocess(
		(val) => (val === '' ? undefined : val),
		z.string().uuid().optional(),
	),
});
