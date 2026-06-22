import { UserRole } from '@generated/postgres/enums';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateGlobalNotificationDto } from '../dto/create-global-notification.dto';
import { GlobalNotificationDto } from '../dto/global-notification.dto';
import { GlobalNotificationService } from '../services/global-notification.service';

@Auth(UserRole.ADMIN)
@Controller('notifications/global')
export class GlobalNotificationController {
	constructor(
		private readonly globalNotificationService: GlobalNotificationService,
	) {}

	@ApiOperation({ summary: 'Create a global notification' })
	@ApiOkResponse({ type: GlobalNotificationDto })
	@Post()
	async createGlobalNotification(@Body() dto: CreateGlobalNotificationDto) {
		return await this.globalNotificationService.createGlobalNotification(dto);
	}

	@ApiOperation({ summary: 'Get all global notifications' })
	@ApiOkResponse({ type: [GlobalNotificationDto] })
	@Get('all')
	async getAllGlobalNotifications() {
		return await this.globalNotificationService.getAllNotifications();
	}

	@ApiOperation({ summary: 'Get a global notification by ID' })
	@ApiOkResponse({ type: GlobalNotificationDto })
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION.GLOBAL_NOT_FOUND,
	)
	@Get(':id')
	async getGlobalNotificationById(@Param('id', ParseUUIDPipe) id: string) {
		return await this.globalNotificationService.getGlobalNotificationById(id);
	}

	@ApiOperation({ summary: 'Update a global notification' })
	@ApiOkResponse({ type: GlobalNotificationDto })
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION.GLOBAL_NOT_FOUND,
	)
	@Patch(':id')
	async updateGlobalNotification(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: CreateGlobalNotificationDto,
	) {
		return await this.globalNotificationService.updateGlobalNotification(
			id,
			dto,
		);
	}

	@ApiOperation({ summary: 'Delete a global notification' })
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.NOTIFICATION.GLOBAL_DELETED,
	)
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION.GLOBAL_NOT_FOUND,
	)
	@Delete(':id')
	async deleteGlobalNotification(@Param('id', ParseUUIDPipe) id: string) {
		return await this.globalNotificationService.deleteGlobalNotification(id);
	}
}
