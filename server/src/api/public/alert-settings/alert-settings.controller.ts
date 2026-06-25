import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Post,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AlertSettingsService } from './alert-settings.service';
import {
	AlertSettingsDto,
	FullAlertSettingsDto,
} from './dto/alert-settings.dto';
import { CreateAlertSettingsDto } from './dto/create-alert-settings.dto';
import { GetHierarchyQueryDto } from './dto/get-hierarchy-query.dto';

@Auth()
@ApiTags('Alert Settings')
@Controller('alert-settings')
export class AlertSettingsController {
	constructor(private readonly alertSettingsService: AlertSettingsService) {}

	@ApiOperation({
		summary: 'Create or update alert settings for a monitor or project',
	})
	@ApiOkResponse({ type: AlertSettingsDto })
	@Post()
	public async createAlertSettings(
		@Authorized('id') userId: string,
		@Body() dto: CreateAlertSettingsDto,
	): Promise<AlertSettingsDto> {
		return await this.alertSettingsService.upsertSettings(userId, dto);
	}

	@ApiOperation({ summary: 'Get effective alert settings for a monitor' })
	@ApiOkResponse({ type: FullAlertSettingsDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.MONITOR.NOT_FOUND)
	@Get('effective/:monitorId')
	public async getEffectiveSettings(
		@Param('monitorId', ParseUUIDPipe) monitorId: string,
	): Promise<FullAlertSettingsDto | null> {
		return await this.alertSettingsService.getEffectiveSettings(monitorId);
	}

	@ApiOperation({
		summary:
			'Get alert settings hierarchy for a user, optionally filtered by project or monitor',
	})
	@ApiOkResponse({ example: [AlertSettingsDto] })
	@Get('hierarchy')
	public async getSettingsHierarchy(
		@Authorized('id') userId: string,
		@Query() query: GetHierarchyQueryDto,
	): Promise<AlertSettingsDto[]> {
		return await this.alertSettingsService.getSettingsHierarchy(
			userId,
			query.projectId,
			query.monitorId,
		);
	}

	@ApiOperation({ summary: 'Delete alert settings by ID' })
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.ALERT.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.ALERT.NOT_FOUND)
	@Delete(':id')
	public async deleteSetting(
		@Authorized('id') userId: string,
		@Param('id', ParseUUIDPipe) id: string,
	): Promise<MessageResponse> {
		return await this.alertSettingsService.deleteAlertSettings(userId, id);
	}
}
