import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse } from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { IsPublic } from '@libs/decorators/is-public.decorator';
import {
	Controller,
	Get,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';
import { AnalyticsDto } from './dto/analytics.dto';

@Auth()
@IsPublic()
@Controller('analytics')
export class AnalyticsController {
	constructor(private readonly analyticsService: AnalyticsService) {}

	@ApiOperation({ summary: 'Get analytics for a specific monitor' })
	@ApiOkResponse({ type: AnalyticsDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.MONITOR.NOT_FOUND,
		ERROR_MESSAGES.REGION.NOT_FOUND,
	])
	@Get(':monitorId')
	public async getAnalyticsByMonitorId(
		@Authorized('id') userId: string,
		@Param('monitorId', ParseUUIDPipe) monitorId: string,
		@Query() query: AnalyticsQueryDto,
	): Promise<AnalyticsDto> {
		return this.analyticsService.getAnalyticsByMonitorId(
			userId,
			monitorId,
			query,
		);
	}
}
