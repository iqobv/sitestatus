import { Module } from '@nestjs/common';
import {
	GlobalNotificationController,
	NotificationController,
	PersonalNotificationController,
} from './controllers';
import {
	GlobalNotificationService,
	NotificationService,
	PersonalNotificationService,
} from './services';

@Module({
	controllers: [
		NotificationController,
		PersonalNotificationController,
		GlobalNotificationController,
	],
	providers: [
		NotificationService,
		PersonalNotificationService,
		GlobalNotificationService,
	],
	exports: [
		NotificationService,
		PersonalNotificationService,
		GlobalNotificationService,
	],
})
export class NotificationModule {}
