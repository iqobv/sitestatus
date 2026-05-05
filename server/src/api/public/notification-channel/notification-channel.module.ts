import { Module } from '@nestjs/common';
import { TokenModule } from '../token/token.module';
import { NotificationChannelController } from './notification-channel.controller';
import { NotificationChannelService } from './notification-channel.service';

@Module({
	controllers: [NotificationChannelController],
	imports: [TokenModule],
	exports: [NotificationChannelService],
	providers: [NotificationChannelService],
})
export class NotificationChannelModule {}
