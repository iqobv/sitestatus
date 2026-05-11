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
import {
	CreatePersonalNotificationDto,
	PersonalNotificationDto,
	UpdatePersonalNotificationDto,
} from '../dto';
import { PersonalNotificationService } from '../services';

@Auth(UserRole.ADMIN)
@Controller('notifications/personal')
export class PersonalNotificationController {
	constructor(
		private readonly personalNotificationService: PersonalNotificationService,
	) {}

	@ApiOperation({ summary: 'Create a personal notification for a user' })
	@ApiOkResponse({ type: PersonalNotificationDto })
	@Post()
	async createPersonalNotification(@Body() dto: CreatePersonalNotificationDto) {
		return await this.personalNotificationService.createPersonalNotification(
			dto,
		);
	}

	@ApiOperation({ summary: 'Get a personal notification by ID' })
	@ApiOkResponse({ type: PersonalNotificationDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(
			ERROR_MESSAGES.NOTIFICATION.PERSONAL_NOT_FOUND,
		),
	})
	@Get(':id')
	async getPersonalNotificationById(@Param('id', ParseUUIDPipe) id: string) {
		return await this.personalNotificationService.getPersonalNotificationById(
			id,
		);
	}

	@ApiOperation({ summary: 'Update a personal notification' })
	@ApiOkResponse({ type: PersonalNotificationDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(
			ERROR_MESSAGES.NOTIFICATION.PERSONAL_NOT_FOUND,
		),
	})
	@Patch(':id')
	async updatePersonalNotification(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() dto: UpdatePersonalNotificationDto,
	) {
		return await this.personalNotificationService.updatePersonalNotification(
			id,
			dto,
		);
	}

	@ApiOperation({ summary: 'Delete a personal notification' })
	@ApiOkResponse({
		type: createCustomMessageDto(SUCCESS_MESSAGES.NOTIFICATION.GLOBAL_DELETED),
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.NOTIFICATION.GLOBAL_NOT_FOUND),
	})
	@Delete(':id')
	async deletePersonalNotification(@Param('id', ParseUUIDPipe) id: string) {
		return await this.personalNotificationService.deletePersonalNotification(
			id,
		);
	}
}
