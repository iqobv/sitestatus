import { Module } from '@nestjs/common';
import { AlertSettingsModule } from '../alert-settings/alert-settings.module';
import { NotificationChannelModule } from '../notification-channel/notification-channel.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	controllers: [UserController],
	exports: [UserService],
	imports: [NotificationChannelModule, AlertSettingsModule],
	providers: [UserService],
})
export class UserModule {}
