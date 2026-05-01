import { Prisma } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { userSelect } from '@libs/prisma/user-select.prisma';
import { hashPassword } from '@libs/utils';
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { AlertSettingsService } from '../alert-settings/alert-settings.service';
import { NotificationChannelService } from '../notification-channel/notification-channel.service';
import { CreateUserDto, InternalUpdateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PgPrismaService,
		private readonly notificationChannelService: NotificationChannelService,
		private readonly alertSettingsService: AlertSettingsService,
	) {}

	async create(dto: CreateUserDto, tx?: Prisma.TransactionClient) {
		const { email, password, ...rest } = dto;

		const prisma = tx || this.prismaService;

		await this.alreadyExists(email, tx);

		const countOfUsers = await prisma.user.count();
		const isAdmin = countOfUsers === 0;

		const hashedPassword = password ? await hashPassword(password) : null;

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				role: isAdmin ? 'ADMIN' : 'USER',
				...rest,
			},
			select: userSelect,
		});

		await this.notificationChannelService.initPrimaryNotificationChannel(
			user.id,
			email,
			tx,
		);

		await this.alertSettingsService.createAlertSettings(user.id, {}, tx);

		return user;
	}

	async findById(
		id: string,
		full: boolean = false,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		const fourtheenDaysAgo = new Date();
		fourtheenDaysAgo.setDate(fourtheenDaysAgo.getDate() - 14);

		const user = await prisma.user.findUnique({
			where: {
				id,
				OR: [{ deletedAt: null }, { deletedAt: { gte: fourtheenDaysAgo } }],
			},
			select: {
				...userSelect,
				...(full && { password: true }),
			},
		});

		if (!user) throw new NotFoundException(ERROR_MESSAGES.USER.USER_NOT_FOUND);
		if (user.deletedAt)
			throw new NotFoundException(ERROR_MESSAGES.USER.USER_DELETED);

		return user;
	}

	async findByEmail(
		email: string,
		full: boolean = false,
		isRestoring: boolean = false,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		const user = await prisma.user.findUnique({
			where: { email },
			select: { ...userSelect, ...(full && { password: true }) },
		});

		if (!user) return null;

		if (user.deletedAt) {
			if (!isRestoring)
				throw new NotFoundException(ERROR_MESSAGES.USER.USER_DELETED);

			const fourteenDaysAgo = new Date();
			fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

			if (user.deletedAt < fourteenDaysAgo)
				throw new NotFoundException(ERROR_MESSAGES.USER.USER_DELETED);
		}

		return user;
	}

	async update(
		userId: string,
		dto: UpdateUserDto,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		const { email } = dto;

		const user = await this.findById(userId);

		if (email && email !== user.email) await this.alreadyExists(email, tx);

		const updatedUser = await prisma.user.update({
			where: { id: user.id, deletedAt: null },
			data: {
				email,
			},
			select: userSelect,
		});

		return updatedUser;
	}

	async updateInternal(
		userId: string,
		dto: InternalUpdateUserDto,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		const { email, emailVerified, role } = dto;

		const user = await this.findById(userId);

		if (email && email !== user.email) await this.alreadyExists(email, tx);

		const updatedUser = await prisma.user.update({
			where: { id: user.id, deletedAt: null },
			data: {
				email,
				emailVerified,
				role,
			},
			select: userSelect,
		});

		return updatedUser;
	}

	async removeAccount(userId: string) {
		const user = await this.findById(userId);

		await this.prismaService.user.update({
			where: { id: user.id, deletedAt: null },
			data: { deletedAt: new Date() },
		});

		await this.prismaService.session.deleteMany({ where: { userId: user.id } });

		return SUCCESS_MESSAGES.USER.USER_DELETED;
	}

	async createInitialDataForRegisteredUser() {
		return await this.prismaService.$transaction(async (tx) => {
			const usersWithoutChannels = await tx.user.findMany({
				where: {
					notificationChannels: { none: {} },
					deletedAt: null,
				},
			});

			const usersWithoutAlertSettings = await tx.user.findMany({
				where: {
					alertSettings: { none: {} },
					deletedAt: null,
				},
			});

			for (const user of usersWithoutChannels) {
				await this.notificationChannelService.initPrimaryNotificationChannel(
					user.id,
					user.email,
					tx,
				);
			}

			for (const user of usersWithoutAlertSettings) {
				await this.alertSettingsService.createAlertSettings(user.id, {}, tx);
			}
		});
	}

	private async alreadyExists(email: string, tx?: Prisma.TransactionClient) {
		const prisma = tx ?? this.prismaService;
		const user = await prisma.user.findUnique({
			where: { email, deletedAt: null },
		});

		if (user)
			throw new ConflictException(ERROR_MESSAGES.USER.USER_ALREADY_EXISTS);
	}
}
