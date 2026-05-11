import { AlertSettingsModule } from '@api/public/alert-settings/alert-settings.module';
import { NotificationModule } from '@api/public/notification/notification.module';
import { Module } from '@nestjs/common';
import { MonitorEngineModule } from '../monitor-engine/monitor-engine.module';
import { AlertWorkerService } from './alert-worker.service';

@Module({
	imports: [AlertSettingsModule, MonitorEngineModule, NotificationModule],
	providers: [AlertWorkerService],
})
export class AlertWorkerModule {}
