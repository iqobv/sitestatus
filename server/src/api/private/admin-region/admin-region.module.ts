import { Module } from '@nestjs/common';
import { MonitorEngineModule } from '../monitor-engine/monitor-engine.module';
import { AdminRegionController } from './admin-region.controller';
import { AdminRegionService } from './admin-region.service';

@Module({
	controllers: [AdminRegionController],
	providers: [AdminRegionService],
	exports: [AdminRegionService],
	imports: [MonitorEngineModule],
})
export class AdminRegionModule {}
