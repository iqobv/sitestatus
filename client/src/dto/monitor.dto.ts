import { createMonitorSchema } from '@/schemas/monitor/createMonitor.schema';
import { baseIsActiveMonitorSchema } from '@/schemas/monitor/isActiveMonitor.shema';
import { baseProjectMonitorSchema } from '@/schemas/monitor/monitorProject.schema';
import { monitorsQuerySchema } from '@/schemas/monitor/monitorsQuery.schema';
import { baseRegionsMonitorSchema } from '@/schemas/monitor/regionsMonitor.schema';
import { updateMonitorSchema } from '@/schemas/monitor/updateMonitor.schema';
import z from 'zod';

export type CreateMonitorDto = z.infer<typeof createMonitorSchema>;
export type UpdateMonitorDto = z.infer<typeof updateMonitorSchema>;
export type BaseRegionsMonitorDto = z.infer<typeof baseRegionsMonitorSchema>;
export type BaseIsActiveMonitorDto = z.infer<typeof baseIsActiveMonitorSchema>;
export type BaseProjectMonitorDto = z.infer<typeof baseProjectMonitorSchema>;
export type MonitorsQueryDto = z.infer<typeof monitorsQuerySchema>;
