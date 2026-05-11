import { DefaultFields } from '../defaultFields.types';
import { NotificationChannel } from './notificationChannel.types';

export interface AlertSettings extends DefaultFields {
	userId: string;
	projectId: string | null;
	monitorId: string | null;
	isEnabled: boolean;
	onDown: boolean;
	onUp: boolean;
	delay: number;
	channels: NotificationChannel[];
}
