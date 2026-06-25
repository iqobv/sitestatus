import { Module } from '@nestjs/common';
import { GlobalNotificationController } from './controllers/global-notification.controller';
import { NotificationController } from './controllers/notification.controller';
import { PersonalNotificationController } from './controllers/personal-notification.controller';
import { GlobalNotificationService } from './services/global-notification.service';
import { NotificationService } from './services/notification.service';
import { PersonalNotificationService } from './services/personal-notification.service';

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
