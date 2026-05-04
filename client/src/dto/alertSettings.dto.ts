import { upsertAlertSettingsSchema } from '@/schemas';
import z from 'zod';

export type UpsertAlertSettingsDto = z.infer<typeof upsertAlertSettingsSchema>;
