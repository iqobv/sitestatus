import { Module } from '@nestjs/common';
import { AdminRegionModule } from './admin-region/admin-region.module';
import { AlertWorkerModule } from './alert-worker/alert-worker.module';
import { CleanupModule } from './cleanup/cleanup.module';
import { MonitorEngineModule } from './monitor-engine/monitor-engine.module';

@Module({
	imports: [
		AdminRegionModule,
		MonitorEngineModule,
		CleanupModule,
		AlertWorkerModule,
	],
})
export class PrivateModule {}
