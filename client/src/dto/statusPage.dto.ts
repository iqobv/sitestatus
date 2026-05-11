import {
	baseStatusPageSchema,
	createStatusPageSchema,
	statusPageMonitorSchema,
	updateStatusPageSchema,
} from '@/schemas';
import z from 'zod';

export type BaseStatusPageDto = z.infer<typeof baseStatusPageSchema>;
export type CreateStatusPageDto = z.infer<typeof createStatusPageSchema>;
export type UpdateStatusPageDto = z.infer<typeof updateStatusPageSchema>;
export type StatusPageMonitorDto = z.infer<typeof statusPageMonitorSchema>;
