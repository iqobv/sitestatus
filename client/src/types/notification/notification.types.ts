import { DefaultFields } from '../defaultFields.types';
import { NotificationType } from './notificationType.types';

export interface Notification extends DefaultFields {
	type: NotificationType;
	isRead: boolean;
	isGlobal: boolean;
	title: string;
	message: string;
	actionUrl: string | null;
}
