import { Prisma, User } from '@generated/postgres/client';
import { GlobalNotificationReadCreateManyInput } from '@generated/postgres/models';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
	CreateGlobalNotificationDto,
	UpdateGlobalNotificationDto,
} from '../dto';

@Injectable()
export class GlobalNotificationService {
	constructor(private readonly prismaService: PgPrismaService) {}

	async createGlobalNotification(
		dto: CreateGlobalNotificationDto,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		return await prisma.globalNotification.create({
			data: dto,
		});
	}

	async markAllGlobalNotificationsAsRead(
		user: User,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		const globalNotifications = await prisma.globalNotification.findMany({
			where: {
				createdAt: {
					gte: user.createdAt,
				},
				NOT: {
					globalNotificationReads: {
						some: {
							userId: user.id,
						},
					},
				},
			},
			select: { id: true },
		});

		const readEntries: GlobalNotificationReadCreateManyInput[] =
			globalNotifications.map((notification) => ({
				globalNotificationId: notification.id,
				userId: user.id,
			}));

		return await prisma.globalNotificationRead.createMany({
			data: readEntries,
			skipDuplicates: true,
		});
	}

	async getAllNotifications() {
		return await this.prismaService.globalNotification.findMany();
	}

	async getGlobalNotificationById(id: string) {
		const notification = await this.prismaService.globalNotification.findUnique(
			{ where: { id } },
		);

		if (!notification)
			throw new NotFoundException(ERROR_MESSAGES.NOTIFICATION.GLOBAL_NOT_FOUND);

		return notification;
	}

	async updateGlobalNotification(id: string, dto: UpdateGlobalNotificationDto) {
		const notification = await this.getGlobalNotificationById(id);

		return await this.prismaService.globalNotification.update({
			where: { id: notification.id },
			data: {
				...dto,
			},
		});
	}

	async deleteGlobalNotification(id: string) {
		const notification = await this.getGlobalNotificationById(id);

		await this.prismaService.globalNotification.delete({
			where: { id: notification.id },
		});

		return SUCCESS_MESSAGES.NOTIFICATION.GLOBAL_DELETED;
	}
}
