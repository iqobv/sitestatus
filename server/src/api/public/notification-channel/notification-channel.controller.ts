import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { Auth, Authorized } from '@libs/decorators';
import { createCustomMessageDto } from '@libs/utils';
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
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import {
	CreateNotificationChannelDto,
	NotificationChannelDto,
	UpdateNotificationChannelDto,
} from './dto';
import { NotificationChannelService } from './notification-channel.service';

@Controller('notification-channels')
export class NotificationChannelController {
	constructor(
		private readonly notificationChannelService: NotificationChannelService,
	) {}

	@Auth()
	@ApiOperation({ summary: 'Create a new notification channel' })
	@ApiConflictResponse({
		type: createCustomMessageDto(
			ERROR_MESSAGES.NOTIFICATION_CHANNEL.ALREADY_EXISTS,
		),
	})
	@ApiCreatedResponse({
		type: createCustomMessageDto(
			SUCCESS_MESSAGES.NOTIFICATION_CHANNEL.VERIFICATION_EMAIL_SENT,
		),
	})
	@Post()
	async createNotificationChannel(
		@Authorized('id') userId: string,
		@Body() dto: CreateNotificationChannelDto,
	) {
		return await this.notificationChannelService.createNotificationChannel(
			userId,
			dto,
		);
	}

	@Auth()
	@ApiOperation({
		summary: 'Get all notification channels for the authenticated user',
	})
	@ApiOkResponse({ type: [NotificationChannelDto] })
	@Get()
	async getAllNotificationChannelsForUser(@Authorized('id') userId: string) {
		return await this.notificationChannelService.getAllNotificationChannelsForUser(
			userId,
		);
	}

	@Auth()
	@Post('verify')
	@ApiOperation({ summary: 'Verify a notification channel using a token' })
	@ApiOkResponse({
		type: createCustomMessageDto(
			SUCCESS_MESSAGES.NOTIFICATION_CHANNEL.VERIFIED,
		),
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.NOTIFICATION_CHANNEL.NOT_FOUND),
	})
	@ApiBadRequestResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.TOKEN.TOKEN_INVALID),
	})
	@HttpCode(HttpStatus.OK)
	async verifyNotificationChannel(
		@Authorized('id') userId: string,
		@Query('token') token: string,
	) {
		return await this.notificationChannelService.verifyNotificationChannel(
			userId,
			token,
		);
	}

	@Auth()
	@ApiOperation({ summary: 'Update a notification channel' })
	@ApiOkResponse({ type: NotificationChannelDto })
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.NOTIFICATION_CHANNEL.NOT_FOUND),
	})
	@Patch(':id')
	async updateNotificationChannel(
		@Authorized('id') userId: string,
		@Param('id') channelId: string,
		@Body() dto: UpdateNotificationChannelDto,
	) {
		return await this.notificationChannelService.updateNotificationChannel(
			userId,
			channelId,
			dto,
		);
	}

	@Auth()
	@Post('resend-verification-email/:id')
	@ApiOperation({
		summary: 'Resend verification email for a notification channel',
	})
	@ApiOkResponse({
		type: createCustomMessageDto(
			SUCCESS_MESSAGES.NOTIFICATION_CHANNEL.VERIFICATION_EMAIL_SENT,
		),
	})
	@ApiNotFoundResponse({
		type: createCustomMessageDto(ERROR_MESSAGES.NOTIFICATION_CHANNEL.NOT_FOUND),
	})
	@HttpCode(HttpStatus.OK)
	@Auth()
	async resendVerificationEmail(
		@Authorized('id') userId: string,
		@Param('id') channelId: string,
	) {
		return await this.notificationChannelService.resendVerificationEmail(
			userId,
			channelId,
		);
	}

	@Auth()
	@ApiOperation({ summary: 'Remove a notification channel' })
	@ApiOkResponse({
		type: createCustomMessageDto(SUCCESS_MESSAGES.NOTIFICATION_CHANNEL.DELETED),
	})
	@ApiConflictResponse({
		type: createCustomMessageDto(
			ERROR_MESSAGES.NOTIFICATION_CHANNEL.CANNOT_REMOVE_PRIMARY,
		),
	})
	@Delete(':id')
	async removeNotificationChannel(
		@Authorized('id') userId: string,
		@Param('id') channelId: string,
	) {
		return await this.notificationChannelService.removeNotificationChannel(
			userId,
			channelId,
		);
	}
}
