import { Module } from '@nestjs/common';
import { CacheListener } from './listeners/cache.listener';
import { EngineDbService } from './services/engine-db.service';
import { MonitorCacheService } from './services/monitor-cache.service';
import { ResultProcessorService } from './services/result-processor.service';
import { TaskDispatcherService } from './services/task-dispatcher.service';

@Module({
	providers: [
		MonitorCacheService,
		TaskDispatcherService,
		ResultProcessorService,
		EngineDbService,
		CacheListener,
	],
	exports: [MonitorCacheService],
})
export class MonitorEngineModule {}
