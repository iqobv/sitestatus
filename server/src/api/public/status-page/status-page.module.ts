import { Module } from '@nestjs/common';
import { MonitorModule } from '../monitor/monitor.module';
import { StatusPageController } from './status-page.controller';
import { StatusPageService } from './status-page.service';

@Module({
	controllers: [StatusPageController],
	imports: [MonitorModule],
	providers: [StatusPageService],
})
export class StatusPageModule {}
