import { Prisma } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreatePersonalNotificationDto } from '../dto/create-personal-notification.dto';
import { NotificationDto } from '../dto/notification.dto';
import { UpdatePersonalNotificationDto } from '../dto/update-personal-notification.dto';

@Injectable()
export class PersonalNotificationService {
	constructor(private readonly prismaService: PgPrismaService) {}

	public async createPersonalNotification(
		dto: CreatePersonalNotificationDto,
		tx?: Prisma.TransactionClient,
	): Promise<NotificationDto> {
		const prisma = tx ?? this.prismaService;

		return await prisma.notification.create({
			data: dto,
		});
	}

	public async markAllPersonalNotificationsAsRead(
		userId: string,
		tx?: Prisma.TransactionClient,
	): Promise<MessageResponse> {
		const prisma = tx ?? this.prismaService;

		await prisma.notification.updateMany({
			where: {
				userId,
				isRead: false,
			},
			data: {
				isRead: true,
			},
		});

		return SUCCESS_MESSAGES.NOTIFICATION.ALL_MARKED_AS_READ;
	}

	public async getPersonalNotificationById(
		id: string,
	): Promise<NotificationDto> {
		const notification = await this.prismaService.notification.findUnique({
			where: { id },
		});

		if (!notification)
			throw new NotFoundException(
				ERROR_MESSAGES.NOTIFICATION.PERSONAL_NOT_FOUND,
			);

		return plainToInstance(NotificationDto, notification);
	}

	public async updatePersonalNotification(
		id: string,
		dto: UpdatePersonalNotificationDto,
	): Promise<NotificationDto> {
		const notification = await this.getPersonalNotificationById(id);

		const updated = await this.prismaService.notification.update({
			where: { id: notification.id },
			data: {
				...dto,
			},
		});

		return plainToInstance(NotificationDto, updated);
	}

	public async deletePersonalNotification(
		id: string,
	): Promise<MessageResponse> {
		const notification = await this.getPersonalNotificationById(id);

		await this.prismaService.notification.delete({
			where: { id: notification.id },
		});

		return SUCCESS_MESSAGES.NOTIFICATION.PERSONAL_DELETED;
	}
}
