import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { MonitorModule } from '../monitor/monitor.module';
import { PingResultModule } from '../ping-result/ping-result.module';
import { MONITORING_QUEUE } from './constants';
import { MonitoringProcessor } from './monitoring.processor';
import { MonitoringScheduler } from './monitoring.scheduler';

@Module({
	imports: [
		HttpModule.register({
			timeout: 15000,
			headers: {
				'User-Agent': 'SitestatusBot/1.0',
			},
		}),
		BullModule.registerQueue({
			name: MONITORING_QUEUE,
			defaultJobOptions: {
				attempts: 3,
				backoff: {
					type: 'exponential',
					delay: 1000,
				},
				removeOnComplete: { count: 100 },
				removeOnFail: { count: 500 },
			},
		}),
		PingResultModule,
		MonitorModule,
	],
	providers: [
		MonitoringScheduler,
		MonitoringProcessor,
		{
			provide: 'BULLMQ_WORKER_OPTIONS',
			useValue: {
				concurrency: 5,
				lockDuration: 60000,
				stalledCheckInterval: 300000,
			},
		},
	],
})
export class MonitoringModule {}
