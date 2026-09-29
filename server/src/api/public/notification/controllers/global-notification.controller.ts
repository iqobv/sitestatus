import { UserRole } from '@generated/postgres/enums';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
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
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateGlobalNotificationDto } from '../dto/create-global-notification.dto';
import { GlobalNotificationDto } from '../dto/global-notification.dto';
import { GlobalNotificationService } from '../services/global-notification.service';

@Auth(UserRole.ADMIN)
@Controller('notifications/global')
export class GlobalNotificationController {
	constructor(
		private readonly globalNotificationService: GlobalNotificationService,
	) {}

	/** Create a new global notification */
	@Post()
	@ApiOkResponse({ type: GlobalNotificationDto })
	public async createGlobalNotification(
		@Body() dto: CreateGlobalNotificationDto,
	): Promise<GlobalNotificationDto> {
		return await this.globalNotificationService.createGlobalNotification(dto);
	}

	/** Get all global notifications */
	@Get('all')
	@ApiOkResponse({ type: [GlobalNotificationDto] })
	public async getAllGlobalNotifications(): Promise<GlobalNotificationDto[]> {
		return await this.globalNotificationService.getAllNotifications();
	}

	/** Get global notification by ID */
	@Get(':id')
	@ApiOkResponse({ type: GlobalNotificationDto })
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION.GLOBAL_NOT_FOUND,
	)
	public async getGlobalNotificationById(
		@Param('id', ParseUUIDPipe) id: string,
	): Promise<GlobalNotificationDto> {
		return await this.globalNotificationService.getGlobalNotificationById(id);
	}

	/** Update a global notification */
	@Patch(':id')
	@ApiOkResponse({ type: GlobalNotificationDto })
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION.GLOBAL_NOT_FOUND,
	)
	public async updateGlobalNotification(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: CreateGlobalNotificationDto,
	): Promise<GlobalNotificationDto> {
		return await this.globalNotificationService.updateGlobalNotification(
			id,
			dto,
		);
	}

	/** Delete a global notification */
	@Delete(':id')
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.NOTIFICATION.GLOBAL_DELETED,
	)
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION.GLOBAL_NOT_FOUND,
	)
	public async deleteGlobalNotification(
		@Param('id', ParseUUIDPipe) id: string,
	): Promise<MessageResponse> {
		return await this.globalNotificationService.deleteGlobalNotification(id);
	}
}
