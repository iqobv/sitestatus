import { Module } from '@nestjs/common';
import { MonitorModule } from '../monitor/monitor.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
	controllers: [ProjectController],
	providers: [ProjectService],
	imports: [MonitorModule],
})
export class ProjectModule {}
