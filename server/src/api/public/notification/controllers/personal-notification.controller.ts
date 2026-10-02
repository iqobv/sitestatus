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
import { CreatePersonalNotificationDto } from '../dto/create-personal-notification.dto';
import { NotificationDto } from '../dto/notification.dto';
import { PersonalNotificationDto } from '../dto/personal-notification.dto';
import { UpdatePersonalNotificationDto } from '../dto/update-personal-notification.dto';
import { PersonalNotificationService } from '../services/personal-notification.service';

@Auth(UserRole.ADMIN)
@Controller('notifications/personal')
export class PersonalNotificationController {
	constructor(
		private readonly personalNotificationService: PersonalNotificationService,
	) {}

	/** Create a new personal notification */
	@Post()
	@ApiOkResponse({ type: NotificationDto })
	public async createPersonalNotification(
		@Body() dto: CreatePersonalNotificationDto,
	): Promise<NotificationDto> {
		return await this.personalNotificationService.createPersonalNotification(
			dto,
		);
	}

	/** Get personal notification by ID */
	@Get(':id')
	@ApiOkResponse({ type: NotificationDto })
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION.PERSONAL_NOT_FOUND,
	)
	public async getPersonalNotificationById(
		@Param('id', ParseUUIDPipe) id: string,
	): Promise<NotificationDto> {
		return await this.personalNotificationService.getPersonalNotificationById(
			id,
		);
	}

	/** Update a personal notification */
	@Patch(':id')
	@ApiOkResponse({ type: PersonalNotificationDto })
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION.PERSONAL_NOT_FOUND,
	)
	public async updatePersonalNotification(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: UpdatePersonalNotificationDto,
	): Promise<NotificationDto> {
		return await this.personalNotificationService.updatePersonalNotification(
			id,
			dto,
		);
	}

	/** Delete a personal notification */
	@Delete(':id')
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.NOTIFICATION.PERSONAL_DELETED,
	)
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION.PERSONAL_NOT_FOUND,
	)
	public async deletePersonalNotification(
		@Param('id', ParseUUIDPipe) id: string,
	): Promise<MessageResponse> {
		return await this.personalNotificationService.deletePersonalNotification(
			id,
		);
	}
}
