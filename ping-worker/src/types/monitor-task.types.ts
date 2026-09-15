import { z } from 'zod';
import { monitorTaskSchema } from '../schemas/monitor-task.schema.js';

export type MonitorTask = z.infer<typeof monitorTaskSchema>;
