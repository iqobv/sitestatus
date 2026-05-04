import { ERROR_MESSAGES } from '@libs/constants';
import { Auth, Authorized } from '@libs/decorators';
import { createCustomMessageDto } from '@libs/utils';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Query,
} from '@nestjs/common';
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { AlertSettingsService } from './alert-settings.service';
import {
	AlertSettingsDto,
	CreateAlertSettingsDto,
	GetHierarchyQueryDto,
} from './dto';

@Auth()
@ApiTags('Alert Settings')
@Controller('alert-settings')
export class AlertSettingsController {
	constructor(private readonly alertSettingsService: AlertSettingsService) {}

	@ApiOperation({
		summary: 'Create or update alert settings for a monitor or project',
	})
	@ApiOkResponse({ example: AlertSettingsDto })
	@Post()
	async createAlertSettings(
		@Authorized('id') userId: string,
		@Body() dto: CreateAlertSettingsDto,
	) {
		return await this.alertSettingsService.upsertSettings(userId, dto);
	}

	@ApiOperation({ summary: 'Get effective alert settings for a monitor' })
	@ApiOkResponse({ example: AlertSettingsDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND),
	})
	@Get('effective/:monitorId')
	async getEffectiveSettings(
		@Param('monitorId', ParseUUIDPipe) monitorId: string,
	) {
		return await this.alertSettingsService.getEffectiveSettings(monitorId);
	}

	@ApiOperation({
		summary:
			'Get alert settings hierarchy for a user, optionally filtered by project or monitor',
	})
	@ApiOkResponse({ example: [AlertSettingsDto] })
	@Get('hierarchy')
	async getSettingsHierarchy(
		@Authorized('id') userId: string,
		@Query() query: GetHierarchyQueryDto,
	) {
		return await this.alertSettingsService.getSettingsHierarchy(
			userId,
			query.projectId,
			query.monitorId,
		);
	}

	@ApiOperation({ summary: 'Delete alert settings by ID' })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.MONITOR.MONITOR_NOT_FOUND),
	})
	@Delete(':id')
	async deleteSetting(
		@Authorized('id') userId: string,
		@Param('id', ParseUUIDPipe) id: string,
	): Promise<void> {
		await this.alertSettingsService.deleteAlertSettings(userId, id);
	}
}
