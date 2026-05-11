import z from 'zod';

export const baseProjectMonitorSchema = z.object({
	projectId: z.preprocess(
		(val) => (val === '' ? undefined : val),
		z.uuidv4().optional(),
	),
});
