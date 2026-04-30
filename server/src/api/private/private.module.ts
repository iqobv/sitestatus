import { Module } from '@nestjs/common';
import { AdminRegionModule } from './admin-region/admin-region.module';
import { MonitorEngineModule } from './monitor-engine/monitor-engine.module';
import { CleanupModule } from './cleanup/cleanup.module';

@Module({
	imports: [AdminRegionModule, MonitorEngineModule, CleanupModule],
})
export class PrivateModule {}
