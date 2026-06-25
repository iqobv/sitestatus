import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
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

	@Auth()
	@ApiOperation({ summary: 'Create a new notification channel' })
	@ApiSuccessResponse(
		HttpStatus.CREATED,
		SUCCESS_MESSAGES.NOTIFICATION_CHANNEL.VERIFICATION_EMAIL_SENT,
	)
	@ApiErrorResponse(
		HttpStatus.CONFLICT,
		ERROR_MESSAGES.NOTIFICATION_CHANNEL.ALREADY_EXISTS,
	)
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
	async verifyNotificationChannel(@Query('token') token: string) {
		return await this.notificationChannelService.verifyNotificationChannel(
			token,
		);
	}

	@Auth()
	@ApiOperation({ summary: 'Update a notification channel' })
	@ApiOkResponse({ type: NotificationChannelDto })
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.NOTIFICATION_CHANNEL.NOT_FOUND,
	)
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
