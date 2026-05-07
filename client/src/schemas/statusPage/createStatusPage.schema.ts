import z from 'zod';
import { baseStatusPageSchema } from './baseStatusPage.schema';
import { statusPageMonitorSchema } from './statusPageMonitor.schema';

export const createStatusPageSchema = baseStatusPageSchema.extend({
	monitors: z
		.array(statusPageMonitorSchema)
		.min(1, { error: 'At least one monitor is required' }),
});
