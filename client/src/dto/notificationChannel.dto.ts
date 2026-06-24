import { createNotificationChannelSchema } from '@/schemas/notificationChannel/createNotificationChannel.schema';
import { baseNotificationChannelSchema } from '@/schemas/notificationChannel/notificationBase.schema';
import { updateNotificationChannelSchema } from '@/schemas/notificationChannel/updateNotificationChannel.types';
import z from 'zod';

export type CreateNotificationChannelDto = z.infer<
	typeof createNotificationChannelSchema
>;
export type UpdateNotificationChannelDto = z.infer<
	typeof updateNotificationChannelSchema
>;
export type BaseNotificationChannelDto = z.infer<
	typeof baseNotificationChannelSchema
>;
