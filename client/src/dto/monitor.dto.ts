import {
	baseIsActiveMonitorSchema,
	baseProjectMonitorSchema,
	baseRegionsMonitorSchema,
	createMonitorSchema,
	updateMonitorSchema,
} from '@/schemas';
import z from 'zod';

export type CreateMonitorDto = z.infer<typeof createMonitorSchema>;
export type UpdateMonitorDto = z.infer<typeof updateMonitorSchema>;
export type BaseRegionsMonitorDto = z.infer<typeof baseRegionsMonitorSchema>;
export type BaseIsActiveMonitorDto = z.infer<typeof baseIsActiveMonitorSchema>;
export type BaseProjectMonitorDto = z.infer<typeof baseProjectMonitorSchema>;
