import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { AnalyticsDto } from './dto';

@Controller('analytics')
export class AnalyticsController {
	constructor(private readonly analyticsService: AnalyticsService) {}

	@ApiOperation({ summary: 'Get analytics for a specific monitor' })
	@ApiOkResponse({ type: AnalyticsDto })
	@Get(':monitorId')
	async getAnalyticsByMonitorId(
		@Param('monitorId') monitorId: string,
		@Query('daysRange') daysRange: number,
	) {
		return this.analyticsService.getAnalyticsByMonitorId(monitorId, daysRange);
	}
}
