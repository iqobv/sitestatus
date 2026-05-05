import {
	baseNotificationChannelSchema,
	createNotificationChannelSchema,
	updateNotificationChannelSchema,
} from '@/schemas/notificationChannel';
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
