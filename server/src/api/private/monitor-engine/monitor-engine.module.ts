import { Module } from '@nestjs/common';
import { EngineDbService } from './services/engine-db.service';
import { ResultProcessorService } from './services/result-processor.service';
import { TaskDispatcherService } from './services/task-dispatcher.service';

@Module({
	providers: [TaskDispatcherService, ResultProcessorService, EngineDbService],
})
export class MonitorEngineModule {}
