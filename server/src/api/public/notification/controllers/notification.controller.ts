import type { User } from '@generated/postgres/client';
import { SUCCESS_MESSAGES } from '@libs/constants';
import { ApiSuccessResponse } from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { IsPublic } from '@libs/decorators/is-public.decorator';
import { PaginationQueryDto } from '@libs/dto/pagination.dto';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserNotificationsDto } from '../dto/notification.dto';
import { NotificationService } from '../services/notification.service';

@IsPublic()
@Auth()
@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {}

	@Get()
	@ApiOperation({ summary: 'Get user notifications' })
	@ApiOkResponse({ example: UserNotificationsDto })
	public async getUserNotifications(
		@Authorized() user: User,
		@Query() query: PaginationQueryDto,
	): Promise<UserNotificationsDto> {
		return await this.notificationService.getUserNotifications(user, query);
	}

	@Post('mark-all-as-read')
	@ApiOperation({ summary: 'Mark all notifications as read' })
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.NOTIFICATION.ALL_MARKED_AS_READ,
	)
	@HttpCode(HttpStatus.OK)
	public async markAllAsRead(
		@Authorized() user: User,
	): Promise<MessageResponse> {
		await this.notificationService.markAllAsRead(user);

		return SUCCESS_MESSAGES.NOTIFICATION.ALL_MARKED_AS_READ;
	}
}
