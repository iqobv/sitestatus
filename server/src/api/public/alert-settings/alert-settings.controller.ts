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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
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

	/** Create or update alert settings */
	@Post()
	@ApiOkResponse({ type: AlertSettingsDto })
	public async createAlertSettings(
		@Authorized('id') userId: string,
		@Body() dto: CreateAlertSettingsDto,
	): Promise<AlertSettingsDto> {
		return await this.alertSettingsService.upsertSettings(userId, dto);
	}

	/** Get effective alert settings for a monitor */
	@Get('effective/:monitorId')
	@ApiOkResponse({ type: FullAlertSettingsDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.MONITOR.NOT_FOUND)
	public async getEffectiveSettings(
		@Param('monitorId', ParseUUIDPipe) monitorId: string,
	): Promise<FullAlertSettingsDto | null> {
		return await this.alertSettingsService.getEffectiveSettings(monitorId);
	}

	/** Get alert settings hierarchy for a user */
	@Get('hierarchy')
	@ApiOkResponse({ example: [FullAlertSettingsDto] })
	public async getSettingsHierarchy(
		@Authorized('id') userId: string,
		@Query() query: GetHierarchyQueryDto,
	): Promise<FullAlertSettingsDto[]> {
		return await this.alertSettingsService.getSettingsHierarchy(
			userId,
			query.projectId,
			query.monitorId,
		);
	}

	/** Delete alert settings by ID */
	@Delete(':id')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.ALERT.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.ALERT.NOT_FOUND)
	public async deleteSetting(
		@Authorized('id') userId: string,
		@Param('id', ParseUUIDPipe) id: string,
	): Promise<MessageResponse> {
		return await this.alertSettingsService.deleteAlertSettings(userId, id);
	}
}
