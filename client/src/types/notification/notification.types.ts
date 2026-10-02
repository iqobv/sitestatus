import { getAllNotifications } from '@/api/notification/getAllNotifications.api';

export type Notification = Awaited<
	ReturnType<typeof getAllNotifications>
>['notifications'][number];
