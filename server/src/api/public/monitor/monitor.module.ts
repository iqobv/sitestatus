import { Module } from '@nestjs/common';
import { MonitorController } from './monitor.controller';
import { MonitorService } from './monitor.service';

@Module({
	controllers: [MonitorController],
	exports: [MonitorService],
	providers: [MonitorService],
})
export class MonitorModule {}
