import { Module } from '@nestjs/common';
import { AlertSettingsController } from './alert-settings.controller';
import { AlertSettingsService } from './alert-settings.service';

@Module({
	controllers: [AlertSettingsController],
	exports: [AlertSettingsService],
	providers: [AlertSettingsService],
})
export class AlertSettingsModule {}
