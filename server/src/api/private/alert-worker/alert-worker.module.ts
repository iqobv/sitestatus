import { AlertSettingsModule } from '@api/public/alert-settings/alert-settings.module';
import { Module } from '@nestjs/common';
import { MonitorEngineModule } from '../monitor-engine/monitor-engine.module';
import { AlertWorkerService } from './alert-worker.service';

@Module({
	imports: [AlertSettingsModule, MonitorEngineModule],
	providers: [AlertWorkerService],
})
export class AlertWorkerModule {}
