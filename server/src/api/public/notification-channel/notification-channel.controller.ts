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
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateNotificationChannelDto } from './dto/create-notification-channel.dto';
import { NotificationChannelDto } from './dto/notification-channel.dto';
import { UpdateNotificationChannelDto } from './dto/update-notification-channel.dto';
import { NotificationChannelService } from './notification-channel.service';

@ApiTags('Notification Channels')
@Controller('notification-channels')
export class NotificationChannelController {
	constructor(
		private readonly notificationChannelService: NotificationChannelService,
	) {}

	/** Create a new notification channel */
	@Auth()
	@ApiSuccessResponse(
		HttpStatus.CREATED,
		SUCCESS_MESSAGES.NOTIFICATION_CHANNEL.VERIFICATION_EMAIL_SENT,
	)
	@ApiErrorResponse(
		HttpStatus.CONFLICT,
		ERROR_MESSAGES.NOTIFICATION_CHANNEL.ALREADY_EXISTS,
	)
	@Post()
	public async createNotificationChannel(
		@Authorized('id') userId: string,
		@Body() dto: CreateNotificationChannelDto,
	): Promise<MessageResponse | void> {
		return await this.notificationChannelService.createNotificationChannel(
			userId,
			dto,
		);
	}

	/** Get all notification channels */
	@Auth()
	@ApiOkResponse({ type: [NotificationChannelDto] })
	@Get()
	public async getAllNotificationChannelsForUser(
		@Authorized('id') userId: string,
	): Promise<NotificationChannelDto[]> {
		return await this.notificationChannelService.getAllNotificationChannelsForUser(
			userId,
		);
	}

	@Post('verify')
	@ApiOperation({ summary: 'Verify a notification channel using a token' })
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.NOTIFICATION_CHANNEL.VERIFIED,
	)
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION_CHANNEL.NOT_FOUND,
	)
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.TOKEN.INVALID)
	@HttpCode(HttpStatus.OK)
	public async verifyNotificationChannel(
		@Query('token') token: string,
	): Promise<MessageResponse> {
		return await this.notificationChannelService.verifyNotificationChannel(
			token,
		);
	}

	/** Update a notification channel by ID */
	@Auth()
	@ApiOkResponse({ type: NotificationChannelDto })
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION_CHANNEL.NOT_FOUND,
	)
	@Patch(':id')
	public async updateNotificationChannel(
		@Authorized('id') userId: string,
		@Param('id') channelId: string,
		@Body() dto: UpdateNotificationChannelDto,
	): Promise<NotificationChannelDto> {
		return await this.notificationChannelService.updateNotificationChannel(
			userId,
			channelId,
			dto,
		);
	}

	/** Resend verification email for a notification channel */
	@Auth()
	@Post('resend-verification-email/:id')
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.NOTIFICATION_CHANNEL.VERIFICATION_EMAIL_SENT,
	)
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION_CHANNEL.NOT_FOUND,
	)
	@ApiErrorResponse(
		HttpStatus.CONFLICT,
		ERROR_MESSAGES.NOTIFICATION_CHANNEL.ALREADY_VERIFIED,
	)
	@HttpCode(HttpStatus.OK)
	public async resendVerificationEmail(
		@Authorized('id') userId: string,
		@Param('id') channelId: string,
	): Promise<MessageResponse | void> {
		return await this.notificationChannelService.resendVerificationEmail(
			userId,
			channelId,
		);
	}

	/** Delete a notification channel by ID */
	@Auth()
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.NOTIFICATION_CHANNEL.DELETED,
	)
	@ApiErrorResponse(
		HttpStatus.CONFLICT,
		ERROR_MESSAGES.NOTIFICATION_CHANNEL.CANNOT_REMOVE_PRIMARY,
	)
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION_CHANNEL.NOT_FOUND,
	)
	@Delete(':id')
	public async removeNotificationChannel(
		@Authorized('id') userId: string,
		@Param('id') channelId: string,
	): Promise<MessageResponse> {
		return await this.notificationChannelService.removeNotificationChannel(
			userId,
			channelId,
		);
	}
}
