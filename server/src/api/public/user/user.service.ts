import { Prisma } from '@generated/postgres/client';
import { PgPrismaService } from '@infra/prisma/pg-prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import { userSelect } from '@libs/prisma/user-select.prisma';
import { hashPassword } from '@libs/utils/password.util';
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { AlertSettingsService } from '../alert-settings/alert-settings.service';
import { NotificationChannelService } from '../notification-channel/notification-channel.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InternalUpdateUserDto, UpdateUserDto } from './dto/update-user.dto';
import { UserDto, UserWithoutPasswordDto } from './dto/user.dto';

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PgPrismaService,
		private readonly notificationChannelService: NotificationChannelService,
		private readonly alertSettingsService: AlertSettingsService,
	) {}

	public async create(
		dto: CreateUserDto,
		tx?: Prisma.TransactionClient,
	): Promise<UserDto> {
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

		const primaryChannel =
			await this.notificationChannelService.initPrimaryNotificationChannel(
				user.id,
				email,
				tx,
			);

		await this.alertSettingsService.upsertSettings(
			user.id,
			{
				channelIds: [primaryChannel.id],
			},
			tx,
		);

		return user;
	}

	public async findById(
		id: string,
		full: true,
		tx?: Prisma.TransactionClient,
	): Promise<UserDto>;
	public async findById(
		id: string,
		full?: false,
		tx?: Prisma.TransactionClient,
	): Promise<UserWithoutPasswordDto>;
	public async findById(
		id: string,
		full: boolean,
		tx?: Prisma.TransactionClient,
	): Promise<UserDto | UserWithoutPasswordDto>;
	public async findById(
		id: string,
		full: boolean = false,
		tx?: Prisma.TransactionClient,
	): Promise<unknown> {
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

		if (!user) throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);
		if (user.deletedAt)
			throw new NotFoundException(ERROR_MESSAGES.USER.DELETED);

		return user;
	}

	public async findByEmail(
		email: string,
		full: true,
		isRestoring?: boolean,
		tx?: Prisma.TransactionClient,
	): Promise<UserDto | null>;
	public async findByEmail(
		email: string,
		full?: false,
		isRestoring?: boolean,
		tx?: Prisma.TransactionClient,
	): Promise<UserWithoutPasswordDto | null>;
	public async findByEmail(
		email: string,
		full: boolean,
		isRestoring: boolean,
		tx?: Prisma.TransactionClient,
	): Promise<UserDto | UserWithoutPasswordDto | null>;
	public async findByEmail(
		email: string,
		full: boolean = false,
		isRestoring: boolean = false,
		tx?: Prisma.TransactionClient,
	): Promise<unknown> {
		const prisma = tx ?? this.prismaService;

		const user = await prisma.user.findUnique({
			where: { email },
			select: { ...userSelect, ...(full && { password: true }) },
		});

		if (!user) return null;

		if (user.deletedAt) {
			if (!isRestoring)
				throw new NotFoundException(ERROR_MESSAGES.USER.DELETED);

			const fourteenDaysAgo = new Date();
			fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

			if (user.deletedAt < fourteenDaysAgo)
				throw new NotFoundException(ERROR_MESSAGES.USER.DELETED);
		}

		return user;
	}

	public async update(
		userId: string,
		dto: UpdateUserDto,
		tx?: Prisma.TransactionClient,
	): Promise<UserWithoutPasswordDto> {
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

	public async updateInternal(
		userId: string,
		dto: InternalUpdateUserDto,
		tx?: Prisma.TransactionClient,
	): Promise<UserWithoutPasswordDto> {
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

	public async removeAccount(userId: string): Promise<void> {
		const user = await this.findById(userId);

		await this.prismaService.user.update({
			where: { id: user.id, deletedAt: null },
			data: { deletedAt: new Date() },
		});

		await this.prismaService.session.deleteMany({ where: { userId: user.id } });
	}

	public async createInitialDataForRegisteredUser(): Promise<void> {
		return await this.prismaService.$transaction(async (tx) => {
			const usersWithoutChannels = await tx.user.findMany({
				where: {
					notificationChannels: { none: {} },
					deletedAt: null,
				},
			});

			for (const user of usersWithoutChannels) {
				const primaryChannel =
					await this.notificationChannelService.initPrimaryNotificationChannel(
						user.id,
						user.email,
						tx,
					);

				await this.alertSettingsService.upsertSettings(
					user.id,
					{
						channelIds: [primaryChannel.id],
					},
					tx,
				);
			}
		});
	}

	private async alreadyExists(
		email: string,
		tx?: Prisma.TransactionClient,
	): Promise<void> {
		const prisma = tx ?? this.prismaService;
		const user = await prisma.user.findUnique({
			where: { email, deletedAt: null },
		});

		if (user) throw new ConflictException(ERROR_MESSAGES.USER.ALREADY_EXISTS);
	}
}
