import { Module } from '@nestjs/common';
import { AdminRegionModule } from './admin-region/admin-region.module';
import { MonitorEngineModule } from './monitor-engine/monitor-engine.module';

@Module({
	imports: [AdminRegionModule, MonitorEngineModule],
})
export class PrivateModule {}
