import z from 'zod';
import { baseProjectMonitorSchema } from './monitorProject.schema';
import { baseRegionsMonitorSchema } from './regionsMonitor.schema';

export const createMonitorSchema = z
	.object({
		name: z.string().min(4, 'Name must be at least 4 characters long'),
		url: z.url('Invalid URL format'),
		checkIntervalSeconds: z.preprocess(
			(val) => {
				if (typeof val === 'number') return val;
				if (typeof val === 'string' && val !== '') return Number(val);
				return val;
			},
			z
				.number()
				.min(300, 'Check interval must be at least 5 minutes')
				.max(86400, 'Check interval cannot exceed 1440 minutes (24 hours)'),
		),
	})
	.extend(baseRegionsMonitorSchema.shape)
	.extend(baseProjectMonitorSchema.shape);
