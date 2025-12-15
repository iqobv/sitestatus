import z from 'zod';
import { createMonitorSchema } from './createMonitor.schema';

export const updateMonitorSchema = createMonitorSchema.partial().extend({
	isActive: z.boolean().optional(),
});
