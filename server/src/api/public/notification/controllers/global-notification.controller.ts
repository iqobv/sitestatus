import { UserRole } from '@generated/postgres/enums';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { Auth } from '@libs/decorators';
import { createCustomMessageDto } from '@libs/utils';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from '@nestjs/common';
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { CreateGlobalNotificationDto, GlobalNotificationDto } from '../dto';
import { GlobalNotificationService } from '../services';

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
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.NOTIFICATION.GLOBAL_NOT_FOUND),
	})
	@Get(':id')
	async getGlobalNotificationById(@Param('id', ParseUUIDPipe) id: string) {
		return await this.globalNotificationService.getGlobalNotificationById(id);
	}

	@ApiOperation({ summary: 'Update a global notification' })
	@ApiOkResponse({ type: GlobalNotificationDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.NOTIFICATION.GLOBAL_NOT_FOUND),
	})
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
	@ApiOkResponse({
		type: createCustomMessageDto(SUCCESS_MESSAGES.NOTIFICATION.GLOBAL_DELETED),
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.NOTIFICATION.GLOBAL_NOT_FOUND),
	})
	@Delete(':id')
	async deleteGlobalNotification(@Param('id', ParseUUIDPipe) id: string) {
		return await this.globalNotificationService.deleteGlobalNotification(id);
	}
}
