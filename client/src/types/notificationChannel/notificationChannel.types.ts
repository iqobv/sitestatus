import { getAllNotificationChannels } from '@/api/notificationChannel/getAllNotificationChannel.api';

export type NotificationChannel = Awaited<
	ReturnType<typeof getAllNotificationChannels>
>[number];
