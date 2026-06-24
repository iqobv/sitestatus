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
import { CreatePersonalNotificationDto } from '../dto/create-personal-notification.dto';
import { PersonalNotificationDto } from '../dto/personal-notification.dto';
import { UpdatePersonalNotificationDto } from '../dto/update-personal-notification.dto';
import { PersonalNotificationService } from '../services/personal-notification.service';

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
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION.PERSONAL_NOT_FOUND,
	)
	@Get(':id')
	async getPersonalNotificationById(@Param('id', ParseUUIDPipe) id: string) {
		return await this.personalNotificationService.getPersonalNotificationById(
			id,
		);
	}

	@ApiOperation({ summary: 'Update a personal notification' })
	@ApiOkResponse({ type: PersonalNotificationDto })
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION.PERSONAL_NOT_FOUND,
	)
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
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.NOTIFICATION.PERSONAL_DELETED,
	)
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION.PERSONAL_NOT_FOUND,
	)
	@Delete(':id')
	async deletePersonalNotification(@Param('id', ParseUUIDPipe) id: string) {
		return await this.personalNotificationService.deletePersonalNotification(
			id,
		);
	}
}
