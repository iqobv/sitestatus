import { MonitorEngineModule } from '@api/private/monitor-engine/monitor-engine.module';
import { Module } from '@nestjs/common';
import { RegionModule } from '../region/region.module';
import { MonitorController } from './monitor.controller';
import { MonitorCalculationService } from './services/monitor-calculation.service';
import { MonitorService } from './services/monitor.service';

@Module({
	controllers: [MonitorController],
	exports: [MonitorService],
	providers: [MonitorCalculationService, MonitorService],
	imports: [RegionModule, MonitorEngineModule],
})
export class MonitorModule {}
