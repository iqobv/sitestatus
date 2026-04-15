import z from 'zod';

export const baseRegionsMonitorSchema = z.object({
	regions: z.array(z.uuidv4()).min(1, 'At least one region must be selected'),
});
