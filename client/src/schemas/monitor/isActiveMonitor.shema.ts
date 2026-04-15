import z from 'zod';

export const baseIsActiveMonitorSchema = z.object({
	isActive: z.boolean(),
});
