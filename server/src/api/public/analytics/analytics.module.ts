import { Module } from '@nestjs/common';
import { AnalyticsCronService } from './analytics-cron/analytics-cron.service';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
	controllers: [AnalyticsController],
	providers: [AnalyticsService, AnalyticsCronService],
})
export class AnalyticsModule {}
