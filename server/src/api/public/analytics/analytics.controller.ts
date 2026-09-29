import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse } from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import {
	Controller,
	Get,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Query,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';
import { AnalyticsDto } from './dto/analytics.dto';

@Auth()
@Controller('analytics')
export class AnalyticsController {
	constructor(private readonly analyticsService: AnalyticsService) {}

	/** Get analytics by monitorId */
	@Get(':monitorId')
	@ApiOkResponse({ type: AnalyticsDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.MONITOR.NOT_FOUND,
		ERROR_MESSAGES.REGION.NOT_FOUND,
	])
	public async getAnalyticsByMonitorId(
		@Authorized('id') userId: string,
		@Param('monitorId', ParseUUIDPipe) monitorId: string,
		@Query() query: AnalyticsQueryDto,
	): Promise<AnalyticsDto> {
		return await this.analyticsService.getAnalyticsByMonitorId(
			userId,
			monitorId,
			query,
		);
	}
}
