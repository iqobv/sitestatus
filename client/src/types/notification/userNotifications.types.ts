import { Notification } from './notification.types';

export interface UserNotifications {
	notifications: Notification[];
	hasUnread: boolean;
	countUnread: number;
}
