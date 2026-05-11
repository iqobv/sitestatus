import type { User } from '@generated/postgres/client';
import { SUCCESS_MESSAGES } from '@libs/constants';
import { Auth, Authorized, IsPublic } from '@libs/decorators';
import { createCustomMessageDto } from '@libs/utils';
import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserNotificationsDto } from '../dto';
import { NotificationService } from '../services/notification.service';

@IsPublic()
@Auth()
@Controller('notifications')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {}

	@ApiOperation({ summary: 'Get user notifications' })
	@ApiOkResponse({ example: [UserNotificationsDto] })
	@Get()
	async getUserNotifications(@Authorized() user: User) {
		return await this.notificationService.getUserNotifications(user);
	}

	@ApiOperation({ summary: 'Mark all notifications as read' })
	@ApiOkResponse({
		type: createCustomMessageDto(
			SUCCESS_MESSAGES.NOTIFICATION.ALL_MARKED_AS_READ,
		),
	})
	@HttpCode(HttpStatus.OK)
	@Post('mark-all-as-read')
	async markAllAsRead(@Authorized() user: User) {
		await this.notificationService.markAllAsRead(user);

		return SUCCESS_MESSAGES.NOTIFICATION.ALL_MARKED_AS_READ;
	}
}
