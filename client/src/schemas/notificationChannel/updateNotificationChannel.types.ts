import z from 'zod';
import { baseNotificationChannelSchema } from './notificationBase.schema';

export const updateNotificationChannelSchema = baseNotificationChannelSchema
	.extend({
		isActive: z.boolean().optional(),
		isPrimary: z.boolean().optional(),
	})
	.partial();
