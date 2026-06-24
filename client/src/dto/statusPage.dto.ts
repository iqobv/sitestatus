import { baseStatusPageSchema } from '@/schemas/statusPage/baseStatusPage.schema';
import { createStatusPageSchema } from '@/schemas/statusPage/createStatusPage.schema';
import { statusPageMonitorSchema } from '@/schemas/statusPage/statusPageMonitor.schema';
import { statusPagesQuerySchema } from '@/schemas/statusPage/statusPagesQuery.schema';
import { updateStatusPageSchema } from '@/schemas/statusPage/updateStatusPage.schema';
import z from 'zod';

export type BaseStatusPageDto = z.infer<typeof baseStatusPageSchema>;
export type CreateStatusPageDto = z.infer<typeof createStatusPageSchema>;
export type UpdateStatusPageDto = z.infer<typeof updateStatusPageSchema>;
export type StatusPageMonitorDto = z.infer<typeof statusPageMonitorSchema>;
export type StatusPagesQueryDto = z.infer<typeof statusPagesQuerySchema>;
