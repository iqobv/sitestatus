import { Prisma } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
	CreatePersonalNotificationDto,
	UpdatePersonalNotificationDto,
} from '../dto';

@Injectable()
export class PersonalNotificationService {
	constructor(private readonly prismaService: PgPrismaService) {}

	async createPersonalNotification(
		dto: CreatePersonalNotificationDto,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		return await prisma.notification.create({
			data: dto,
		});
	}

	async markAllPersonalNotificationsAsRead(
		userId: string,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		return await prisma.notification.updateMany({
			where: {
				userId,
				isRead: false,
			},
			data: {
				isRead: true,
			},
		});
	}

	async getPersonalNotificationById(id: string) {
		const notification = await this.prismaService.notification.findUnique({
			where: { id },
		});

		if (!notification)
			throw new NotFoundException(
				ERROR_MESSAGES.NOTIFICATION.PERSONAL_NOT_FOUND,
			);

		return notification;
	}

	async updatePersonalNotification(
		id: string,
		dto: UpdatePersonalNotificationDto,
	) {
		const notification = await this.getPersonalNotificationById(id);

		return await this.prismaService.notification.update({
			where: { id: notification.id },
			data: {
				...dto,
			},
		});
	}

	async deletePersonalNotification(id: string) {
		const notification = await this.getPersonalNotificationById(id);

		await this.prismaService.notification.delete({
			where: { id: notification.id },
		});

		return SUCCESS_MESSAGES.NOTIFICATION.PERSONAL_DELETED;
	}
}
