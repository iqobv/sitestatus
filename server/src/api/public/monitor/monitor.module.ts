import { MonitorEngineModule } from '@api/private/monitor-engine/monitor-engine.module';
import { Module } from '@nestjs/common';
import { RegionModule } from '../region/region.module';
import { MonitorController } from './monitor.controller';
import { MonitorService } from './monitor.service';

@Module({
	controllers: [MonitorController],
	exports: [MonitorService],
	providers: [MonitorService],
	imports: [RegionModule, MonitorEngineModule],
})
export class MonitorModule {}
