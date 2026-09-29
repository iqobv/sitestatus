import { Prisma } from '@generated/postgres/client';
import {
	ChannelStatus,
	ChannelType,
	TokenType,
} from '@generated/postgres/enums';
import { MailService } from '@infra/mail/mail.service';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TokenService } from '../token/token.service';
import { CreateNotificationChannelDto } from './dto/create-notification-channel.dto';
import { InternalCreateNotificationChannelDto } from './dto/internal-create-notification-channel.dto';
import { NotificationChannelDto } from './dto/notification-channel.dto';
import { UpdateNotificationChannelDto } from './dto/update-notification-channel.dto';

@Injectable()
export class NotificationChannelService {
	constructor(
		private readonly prismaService: PgPrismaService,
		private readonly mailService: MailService,
		private readonly tokenService: TokenService,
	) {}

	public async initPrimaryNotificationChannel(
		userId: string,
		email: string,
		tx?: Prisma.TransactionClient,
	): Promise<NotificationChannelDto> {
		return await this.saveNotificationChannel(
			userId,
			{
				type: ChannelType.EMAIL,
				status: ChannelStatus.VERIFIED,
				name: 'Primary Email',
				value: email,
				isPrimary: true,
				isActive: true,
			},
			tx,
		);
	}

	public async createNotificationChannel(
		userId: string,
		dto: CreateNotificationChannelDto,
	): Promise<MessageResponse | void> {
		const { name, type, value } = dto;

		const existing = await this.prismaService.notificationChannel.findFirst({
			where: { userId, value, type },
		});

		if (existing)
			throw new ConflictException(
				ERROR_MESSAGES.NOTIFICATION_CHANNEL.ALREADY_EXISTS,
			);

		return await this.prismaService.$transaction(async (tx) => {
			const channel = await this.saveNotificationChannel(
				userId,
				{
					type,
					name,
					value,
					status: ChannelStatus.PENDING,
					isPrimary: false,
					isActive: false,
				},
				tx,
			);

			return await this.handleVerificationFlow(
				userId,
				channel.id,
				channel.type,
				channel.value,
				tx,
			);
		});
	}

	public async getAllNotificationChannelsForUser(
		userId: string,
	): Promise<NotificationChannelDto[]> {
		const notificationChannels =
			await this.prismaService.notificationChannel.findMany({
				where: { userId },
				orderBy: { createdAt: 'desc' },
			});

		const sortedChannels = notificationChannels.sort((a, b) => {
			if (a.isPrimary && !b.isPrimary) return -1;
			if (!a.isPrimary && b.isPrimary) return 1;
			return 0;
		});

		return plainToInstance(NotificationChannelDto, sortedChannels);
	}

	public async getNotificationChannelById(
		userId: string,
		channelId: string,
	): Promise<NotificationChannelDto> {
		const channel = await this.prismaService.notificationChannel.findFirst({
			where: { id: channelId, userId },
		});

		if (!channel)
			throw new NotFoundException(
				ERROR_MESSAGES.NOTIFICATION_CHANNEL.NOT_FOUND,
			);

		return plainToInstance(NotificationChannelDto, channel);
	}

	public async updateNotificationChannel(
		userId: string,
		channelId: string,
		dto: UpdateNotificationChannelDto,
	): Promise<NotificationChannelDto> {
		const { isActive, isPrimary, name } = dto;

		return await this.prismaService.$transaction(async (tx) => {
			const channel = await tx.notificationChannel.findFirst({
				where: { id: channelId, userId },
			});

			const countOfChannels = await tx.notificationChannel.count({
				where: { userId },
			});

			if (!channel)
				throw new NotFoundException(
					ERROR_MESSAGES.NOTIFICATION_CHANNEL.NOT_FOUND,
				);

			const primaryChannel =
				isPrimary &&
				(await tx.notificationChannel.findFirst({
					where: { userId, isPrimary: true, type: channel.type },
				}));

			if (isPrimary && primaryChannel && primaryChannel.id !== channelId) {
				await tx.notificationChannel.update({
					where: { id: primaryChannel.id, userId },
					data: { isPrimary: false },
				});
			}

			const updatedChannel = await tx.notificationChannel.update({
				where: { id: channelId, userId, type: channel.type },
				data: {
					name,
					isActive:
						countOfChannels === 1 || isPrimary
							? true
							: (isActive ?? channel.isActive),
					isPrimary:
						countOfChannels === 1 ? true : (isPrimary ?? channel.isPrimary),
				},
			});

			return plainToInstance(NotificationChannelDto, updatedChannel);
		});
	}

	public async removeNotificationChannel(
		userId: string,
		channelId: string,
	): Promise<MessageResponse> {
		const channel = await this.prismaService.notificationChannel.findFirst({
			where: { id: channelId, userId },
		});

		if (!channel)
			throw new NotFoundException(
				ERROR_MESSAGES.NOTIFICATION_CHANNEL.NOT_FOUND,
			);

		if (channel.isPrimary)
			throw new ConflictException(
				ERROR_MESSAGES.NOTIFICATION_CHANNEL.CANNOT_REMOVE_PRIMARY,
			);

		const countOfChannels = await this.prismaService.notificationChannel.count({
			where: { userId },
		});

		if (countOfChannels <= 1)
			throw new ConflictException(
				ERROR_MESSAGES.NOTIFICATION_CHANNEL.CANNOT_REMOVE_PRIMARY,
			);

		await this.prismaService.notificationChannel.delete({
			where: { id: channelId, userId },
		});

		return SUCCESS_MESSAGES.NOTIFICATION_CHANNEL.DELETED;
	}

	public async resendVerificationEmail(
		userId: string,
		channelId: string,
	): Promise<MessageResponse | void> {
		const channel = await this.prismaService.notificationChannel.findFirst({
			where: { id: channelId, userId },
		});

		if (!channel)
			throw new NotFoundException(
				ERROR_MESSAGES.NOTIFICATION_CHANNEL.NOT_FOUND,
			);

		if (channel.status === ChannelStatus.VERIFIED)
			throw new ConflictException(
				ERROR_MESSAGES.NOTIFICATION_CHANNEL.ALREADY_VERIFIED,
			);

		return await this.handleVerificationFlow(
			userId,
			channel.id,
			channel.type,
			channel.value,
		);
	}

	public async verifyNotificationChannel(
		token: string,
	): Promise<MessageResponse> {
		await this.prismaService.$transaction(async (tx) => {
			const tokenData = await this.tokenService.verifyAndConsumeToken(
				token,
				TokenType.EMAIL_ALERT_VERIFICATION,
				tx,
			);

			if (!tokenData.channel)
				throw new NotFoundException(
					ERROR_MESSAGES.NOTIFICATION_CHANNEL.NOT_FOUND,
				);

			await tx.notificationChannel.update({
				where: {
					id: tokenData.channel.id,
					userId: tokenData.id,
					type: tokenData.channel.type,
				},
				data: {
					status: ChannelStatus.VERIFIED,
					isActive: true,
				},
			});
		});

		return SUCCESS_MESSAGES.NOTIFICATION_CHANNEL.VERIFIED;
	}

	private async handleVerificationFlow(
		userId: string,
		channelId: string,
		type: ChannelType,
		value: string,
		tx?: Prisma.TransactionClient,
	): Promise<MessageResponse | void> {
		if (type === ChannelType.EMAIL) {
			const token = await this.tokenService.createToken(
				{
					type: TokenType.EMAIL_ALERT_VERIFICATION,
					expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
					userId,
					channelId,
				},
				tx,
			);
			await this.mailService.sendEmailNotificationChannelVerify(value, token);

			return SUCCESS_MESSAGES.NOTIFICATION_CHANNEL.VERIFICATION_EMAIL_SENT;
		}
	}

	private async saveNotificationChannel(
		userId: string,
		channelData: InternalCreateNotificationChannelDto,
		tx?: Prisma.TransactionClient,
	): Promise<NotificationChannelDto> {
		const prisma = tx ?? this.prismaService;

		return await prisma.notificationChannel.create({
			data: {
				userId,
				...channelData,
			},
		});
	}
}
