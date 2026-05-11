import { ChannelType } from '@/types';
import z from 'zod';
import { baseNotificationChannelSchema } from './notificationBase.schema';

export const createNotificationChannelSchema =
	baseNotificationChannelSchema.extend({
		type: z.enum(ChannelType, { error: 'Invalid channel type' }),
		value: z.string({ error: 'Value is required' }),
	});
