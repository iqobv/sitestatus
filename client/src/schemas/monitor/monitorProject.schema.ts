import z from 'zod';

export const baseProjectMonitorSchema = z.object({
	projectId: z.uuidv4().or(z.literal('')),
});
