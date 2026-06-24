import { upsertAlertSettingsSchema } from '@/schemas/alertSettings/upsertAlertSettings.schema';
import z from 'zod';

export type UpsertAlertSettingsDto = z.infer<typeof upsertAlertSettingsSchema>;
