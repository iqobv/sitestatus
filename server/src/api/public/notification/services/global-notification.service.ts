import { Prisma, User } from '@generated/postgres/client';
import { GlobalNotificationReadCreateManyInput } from '@generated/postgres/models';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateGlobalNotificationDto } from '../dto/create-global-notification.dto';
import { GlobalNotificationDto } from '../dto/global-notification.dto';
import { UpdateGlobalNotificationDto } from '../dto/update-global-notification.dto';

@Injectable()
export class GlobalNotificationService {
	constructor(private readonly prismaService: PgPrismaService) {}

	public async createGlobalNotification(
		dto: CreateGlobalNotificationDto,
		tx?: Prisma.TransactionClient,
	): Promise<GlobalNotificationDto> {
		const prisma = tx ?? this.prismaService;

		const created = await prisma.globalNotification.create({
			data: dto,
		});

		return plainToInstance(GlobalNotificationDto, created);
	}

	public async markAllGlobalNotificationsAsRead(
		user: User,
		tx?: Prisma.TransactionClient,
	): Promise<MessageResponse> {
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

		await prisma.globalNotificationRead.createMany({
			data: readEntries,
			skipDuplicates: true,
		});

		return SUCCESS_MESSAGES.NOTIFICATION.ALL_MARKED_AS_READ;
	}

	public async getAllNotifications(): Promise<GlobalNotificationDto[]> {
		const notifications =
			await this.prismaService.globalNotification.findMany();

		return plainToInstance(GlobalNotificationDto, notifications);
	}

	public async getGlobalNotificationById(
		id: string,
	): Promise<GlobalNotificationDto> {
		const notification = await this.prismaService.globalNotification.findUnique(
			{ where: { id } },
		);

		if (!notification)
			throw new NotFoundException(ERROR_MESSAGES.NOTIFICATION.GLOBAL_NOT_FOUND);

		return plainToInstance(GlobalNotificationDto, notification);
	}

	public async updateGlobalNotification(
		id: string,
		dto: UpdateGlobalNotificationDto,
	): Promise<GlobalNotificationDto> {
		const notification = await this.getGlobalNotificationById(id);

		const updated = await this.prismaService.globalNotification.update({
			where: { id: notification.id },
			data: {
				...dto,
			},
		});

		return plainToInstance(GlobalNotificationDto, updated);
	}

	public async deleteGlobalNotification(id: string): Promise<MessageResponse> {
		const notification = await this.getGlobalNotificationById(id);

		await this.prismaService.globalNotification.delete({
			where: { id: notification.id },
		});

		return SUCCESS_MESSAGES.NOTIFICATION.GLOBAL_DELETED;
	}
}
