import { createMonitorSchema, updateMonitorSchema } from '@/schemas';
import z from 'zod';

export type CreateMonitorDto = z.infer<typeof createMonitorSchema>;
export type UpdateMonitorDto = z.infer<typeof updateMonitorSchema>;
